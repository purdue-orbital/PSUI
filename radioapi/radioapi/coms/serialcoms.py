import dataclasses
import json
import serial
import json

from dataclasses import dataclass
from typing import Callable, Union, Optional


@dataclass(frozen=True)
class SerialComMessage:
    ABORT: int
    QDM: int
    STAB: int
    LAUNCH: int
    ABORT: int
    ARMED: Optional[int] = None

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
        self.__port = port
        self.__baudrate = baudrate
        self.ser = serial.Serial(port, baudrate)

    def recieve_forever(self, func: Callable[[SerialComMessage], None]) -> None:
        msg = ''
        while True:
            c = self.ser.read().decode()
            if c == '&':
                try:
                    func(SerialComMessage.from_string(msg))
                except Exception:
                    print(f'Invalid Messge Recieved: {msg}')
                finally:
                    msg = ''
            else:
                msg += c

    def write(self, msg: Union[SerialComMessage, str]):
        if isinstance(msg, str):
            msg = SerialComMessage.from_string(msg)
        self.ser.write(f"{json.dumps(msg.as_dict)}&".encode())
        self.ser.flush()

    @property
    def port(self):
        return self.__port

    @property
    def baudrate(self):
        return self.__baudrate
