import dataclasses
import json
from os import name
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
            char = self.ser.read().decode()
            if char == '&':
                func(SerialComMessage.from_string(msg))
                msg = ''
            else:
                msg += char

    def write(self, msg: SerialComMessage):
        self.ser.write(f"{json.dumps(msg.as_dict)}\n".encode())
        self.ser.flush()


if __name__ == '__main__':
    # d = SerialComMessage.from_string('{"ABORT": 1, "QDM": 1, "STAB": 1, "LAUNCH": 1, "ARM": 0}')

    # print(d)
    # print(d.ARM)
    # print(d['ARM'])
    # print(d)

    # print(type('mystr'.encode()))

    print('yo')
    c = SerialComs('/dev/ttyUSB0', 9600)
    c.recieve_forever(lambda x: print(f'Message: {x}'))

    # ser = serial.Serial('/dev/ttyUSB0', 9600)
    # # ser.write(b"FUCK RADIOS")
    # # ser.flush()
    # # print('done')

    # # .decode("utf-8")
    # while True:
    #     print(f'Message -> {ser.read_until(expected="&")}')
    #     print('YOO')