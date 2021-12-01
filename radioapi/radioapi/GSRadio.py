import threading as thread
import json
from typing import Union
from .Radio import Radio


class GSRadio(Radio):
    def __init__(self, DEBUG=0, port='/dev/ttyUSB0', baudrate=9600):
        """
        DEBUG 0 is for communication between two computers, for which hostname must also be defined. DEBUG 1 is for local communication uses localhost hostname.
        """

        super().__init__(DEBUG=DEBUG, port=port, baudrate=baudrate)

        #logging.basicConfig(level=(logging.INFO, logging.DEBUG)[self.DEBUG > 0], filename='mission.log', format='%(asctime)s %(levelname)s:%(message)s')
        try:
            thread.Thread(target=self.receive, daemon=True).start()
        except Exception as e:
            raise Exception("Could not start GS Recieving Thread") from e

    def receive(self) -> None:
        self._serial_com.recieve_forever(lambda m: self.queue.append(m))

    def send(self, data: Union[dict, str]) -> bool:
        """
        Sends JSON formatted data to the socket attached to radio interface.
        For single variable values, do not exceed one layer of depth.
        For multi-variable values, do not exceed two layers of depth.

        JSON formatting is maintained by Matt Drozt. TODO: Example will be included at a later date.

        Ground Station must append state.
        """
        # logging.info(data)
        try:
            self._serial_com.write(str(data))
            return True
        except Exception:
            return False
