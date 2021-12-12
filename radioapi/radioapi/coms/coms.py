from __future__ import annotations

from abc import ABC
import json

import dataclasses
from dataclasses import dataclass

from typing import Callable, Optional, Union


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


class Coms(ABC):
    """Base Class for any Communication Strategies"""

    def read_forever(self, func: Callable[[ComMessage], None]) -> None:
        pass

    def write(self, m: ParsableComType) -> bool:
        pass
