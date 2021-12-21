from typing import Any, Callable
from ..drivers import BaseComsDriver
from ..messages import ComsMessage


class ComsSubscription:
    def __init__(self, on_update: Callable[[ComsMessage], Any]) -> None:
        self.on_update = on_update

    def update(self, message: ComsMessage, _: BaseComsDriver) -> None:
        self.on_update(message)


class OneTimeComsSubscription(ComsSubscription):
    def update(self, message: ComsMessage, driver: BaseComsDriver) -> None:
        super().update(message, driver)
        driver.unregister_subscriber(self)
