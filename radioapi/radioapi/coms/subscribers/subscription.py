from __future__ import annotations

from typing import Any, Callable, TYPE_CHECKING, Protocol


if TYPE_CHECKING:
    from ..messages import ComsMessage
    from ..drivers import BaseComsDriver


class ComsSubscriberLike(Protocol):
    def update(self, message: ComsMessage, driver: BaseComsDriver) -> Any:
        ...


class ComsSubscription:
    def __init__(self, on_update: Callable[[ComsMessage], Any]) -> None:
        self.on_update = on_update

    def update(self, message: ComsMessage, _: BaseComsDriver) -> None:
        self.on_update(message)


class OneTimeComsSubscription(ComsSubscription):
    def update(self, message: ComsMessage, driver: BaseComsDriver) -> None:
        super().update(message, driver)
        driver.unregister_subscriber(self)
