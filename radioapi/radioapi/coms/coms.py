from __future__ import annotations

from abc import ABC, abstractmethod
import json
from threading import Condition, Event, Thread

import dataclasses
from dataclasses import dataclass

from typing import Any, Callable, Iterable, Mapping, Optional, Protocol, Set, Union


class ComMessageParseError(ValueError):
    """Failed to parse a com message"""


@dataclass(frozen=True)
class ComMessage:
    """Message Specs to be sent by Coms"""

    ABORT: int
    QDM: int
    STAB: int
    LAUNCH: int
    ARMED: Optional[int] = None
    DATA: Optional[dict] = None

    @classmethod
    def from_string(cls, s: str) -> ComMessage:
        return cls(**json.loads(s))

    def __getitem__(self, _item):
        return self.as_dict[_item]

    @property
    def as_dict(self) -> dict:
        return dataclasses.asdict(self)


ParsableComType = Union[ComMessage, str, dict]


def construct_message(m: ParsableComType):
    try:
        if isinstance(m, ComMessage):
            return m
        if isinstance(m, str):
            return ComMessage.from_string(m)
        if isinstance(m, dict):
            return ComMessage.from_string(json.dumps(m))
    except Exception as e:
        raise ComMessageParseError(f"Failed to parse ComsMessage from {m}") from e
    raise TypeError(f"Cannot construct a Coms message from type: {type(m)}")


class ComsSubscriberLike(Protocol):
    def update(self, message: ComMessage, driver: ComsDriver) -> Any:
        ...


class ComsSubscription:
    def __init__(self, on_update: Callable[[ComMessage], Any]) -> None:
        self.on_update = on_update

    def update(self, message: ComMessage, _: ComsDriver) -> None:
        self.on_update(message)


class OneTimeComsSubscription(ComsSubscription):
    def update(self, message: ComMessage, driver: ComsDriver) -> None:
        super().update(message, driver)
        driver.unregister_subscriber(self)


class ComsDriverReadError(Exception):
    pass


class ComsDriverReadLooop(Thread):
    def __init__(
        self,
        read: Callable[[], Any],
        name: Union[str, None] = None,
        daemon: Union[bool, None] = None,
    ) -> None:
        super().__init__(name=name, daemon=daemon)
        self._stop_event = Event()
        self.read = read

    def run(self) -> None:
        while not self._stop_event.is_set():
            self.read()
            self._stop_event.wait(1)

    def stop(self, timeout: Union[float, None] = None):
        self._stop_event.set()
        self.join(timeout=timeout)


class ComsDriver(ABC):
    """Base Class for any Communication Strategies"""

    def __init__(self) -> None:
        super().__init__()
        self.subscrbers: Set[ComsSubscriberLike] = set()
        self._read_loop: Optional[ComsDriverReadLooop] = None

    def start_read_loop(self, block: bool = False) -> ComsDriverReadLooop:
        if self._read_loop:
            self.end_read_loop()
        self._read_loop = self._spawn_read_loop_thread()
        self._read_loop.start()
        if block:
            self._read_loop.join()
        return self._read_loop

    def end_read_loop(self):
        if self._read_loop:
            if self._read_loop.is_alive():
                self._read_loop.stop()
            self._read_loop = None

    def _spawn_read_loop_thread(self) -> ComsDriverReadLooop:
        return ComsDriverReadLooop(
            lambda: self._notify_subscribers(self._read()), daemon=True
        )

    def read(self) -> ComMessage:
        cv = Condition()
        message: Optional[ComMessage] = None

        def _get_next(m: ComMessage):
            nonlocal message
            with cv:
                message = m
                cv.notify()

        self.register_subscriber(OneTimeComsSubscription(_get_next))
        with cv:
            cv.wait_for(lambda: message is not None)
            if message is None:
                raise ComsDriverReadError("Failed to read next message")
        return message

    @abstractmethod
    def _read(self) -> ComMessage:
        pass

    def write(self, m: ParsableComType) -> bool:
        return self._write(m)

    @abstractmethod
    def _write(self, m: ParsableComType) -> bool:
        pass

    def register_subscriber(self, sub: ComsSubscriberLike) -> None:
        self.subscrbers.add(sub)

    def unregister_subscriber(self, sub: ComsSubscriberLike) -> None:
        if sub in self.subscrbers:
            self.subscrbers.remove(sub)

    def _notify_subscribers(self, m: ComMessage):
        for s in self.subscrbers.copy():
            s.update(m, self)
