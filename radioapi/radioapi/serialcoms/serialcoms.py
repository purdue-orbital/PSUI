import dataclasses
import json
import serial
import json

from dataclasses import dataclass
from typing import Callable


@dataclass(frozen=True)
class SerialComMessage:
    ABORT: bool
    QDM: bool
    STAB: bool
    LAUNCH: bool
    ABORT: bool
    ARM: bool

    @classmethod
    def from_string(cls, s: str):
        return cls(**json.loads(s))

    def __getitem__(self, _item):
        return self.as_dict[_item]

    @property
    def as_dict(self):
        return dataclasses.asdict(self)


class SerialComs:
    def __init__(self, port: str, baudrate: int) -> None:
        self.ser = serial.Serial(port, baudrate)

    def recieve_forever(self, func: Callable[[SerialComMessage], None]) -> None:
        msg = ''
        while True:
            c = self.ser.read().decode()
            if c == '&':
                func(SerialComMessage.from_string(msg))
                msg = ''
            else:
                msg += c

    def write(self, msg: SerialComMessage):
        self.ser.write(f"{json.dumps(msg.as_dict)}&".encode())
        self.ser.flush()
