from abc import ABC, abstractmethod
from .coms.serialcoms import SerialComs

class Radio(ABC):
    def __init__(self, DEBUG=0, port='/dev/ttyUSB0', baudrate=9600, coms=None):
        """
        DEBUG 0 is for communication between two computers, for which hostname must also be defined. DEBUG 1 is for local communication uses localhost hostname.
        """
        self.launch = False
        self.qdm = False
        self.abort = False
        self.stab = False

        self.__debug = DEBUG
        self.queue = None

        if coms is None:
            coms = SerialComs
        
        try:
            self._serial_com = coms(port, baudrate)
        except Exception as e:
            raise Exception("Failed to create Radio serial coms")

    @abstractmethod
    def receive(self):
        pass

    @abstractmethod
    def send(self, data):
        """
        Sends JSON formatted data to the socket attached to radio interface.
        For single variable values, do not exceed one layer of depth.
        For multi-variable values, do not exceed two layers of depth.

        JSON formatting is maintained by Matt Drozt. TODO: Example will be included at a later date.

        Ground Station must append state.
        """
        pass

    def bindQueue(self, queue):
        """
        Supply a queue reference for data placement. See recvTest.py for example usage.
        """
        self.queue = queue

    def getLaunchFlag(self):
        return self.launch

    def getQDMFlag(self):
        return self.qdm

    def getAbortFlag(self):
        return self.abort

    def getStabFlag(self):
        return self.stab

    @property
    def DEBUG(self):
        return self.__debug

    @property
    def port(self):
        return self._serial_com.port

    @property
    def baudrate(self):
        return self._serial_com.baudrate
