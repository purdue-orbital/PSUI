import threading as thread
from .Radio import Radio


class LSRadio(Radio):
    def __init__(self, DEBUG=0, port='/dev/ttyUSB0', baudrate=9600):
        """
        DEBUG 0 is for communication between two computers, for which hostname must also be defined. DEBUG 1 is for local communication uses localhost hostname.
        """
        super().__init__(DEBUG=DEBUG, port=port, baudrate=baudrate)

        # logging.basicConfig(level=logging.INFO if not self.DEBUG else logging.DEBUG,
        #                     filename='mission.log',
        #                     format='%(asctime)s %(levelname)s:%(message)s')

        try:
            thread.Thread(target=self.receive, daemon=True).start()
        except Exception as e:
            raise Exception("Could not start LS recieve thread") from e

    def receive(self) -> None:
        self._serial_com.recieve_forever(lambda m: self.queue.append(m))

    def send(self, data: dict) -> bool:
        """
        Sends JSON formatted data to the socket attached to radio interface.
        For single variable values, do not exceed one layer of depth.
        For multi-variable values, do not exceed two layers of depth.

        JSON formatting is maintained by Matt Drozt. TODO: Example will be included at a later date.

        Ground Station must append state.
        """
        try:
            self._serial_com.write(data)
            return True
        except Exception:
            return False
