import json
import serial
import json

from typing import Callable

from .coms import ComMessage, Coms, ParsableComType, construct_message


class SerialComs(Coms):
    def __init__(self, port: str, baudrate: int) -> None:
        self.__port = port
        self.__baudrate = baudrate
        self.ser = serial.Serial(port, baudrate)

    def read_forever(self, func: Callable[[ComMessage], None]) -> None:
        msg = ''
        while True:
            c = self.ser.read().decode(errors='ignore')
            if c == '&':
                try:
                    func(ComMessage.from_string(msg))
                except Exception:
                    print(f'Invalid Messge Recieved: {msg}')
                finally:
                    msg = ''
            else:
                msg += c

    def write(self, msg: ParsableComType):
        m = construct_message(msg)
        self.ser.write(f"{json.dumps(m.as_dict)}&".encode())
        self.ser.flush()

    @property
    def port(self):
        return self.__port

    @property
    def baudrate(self):
        return self.__baudrate
