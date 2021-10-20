from abc import ABC, abstractmethod
from enum import Enum


class Radio(ABC):
    def __init__(self, DEBUG=0, hostname='127.0.0.1'):
        """
        DEBUG 0 is for communication between two computers, for which hostname must also be defined. DEBUG 1 is for local communication uses localhost hostname.
        """
        self.launch = False
        self.qdm = False
        self.abort = False
        self.stab = False

        self.__debug = DEBUG
        self.__hostname = (hostname)
        self.queue = None

    @abstractmethod
    def receive(self) -> None:
        pass

    @abstractmethod
    def send(self, data: str) -> bool:
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
    def hostname(self):
        return self.__hostname
