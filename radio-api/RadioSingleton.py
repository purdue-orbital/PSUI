import RadioAlpha2 as Radio
import json


class Singleton:
    __instance = None  # FIXME: This is never used, I believe this is supoosed to exisit on RadioSingleton

    def __init__(self, DEBUG=0, isGroundStation=False, hostname='127.0.0.1'):
        if RadioSingleton.__instance is not None:
            raise Exception("Constructor should not be called")
        else:
            RadioSingleton.__instance = RadioSingleton()

    def get_instance(self):
        if RadioSingleton.__instance is None:
            RadioSingleton()
        return RadioSingleton.__instance


class RadioSingleton:
    def __init__(self, DEBUG=0, isGroundStation=False, hostname='127.0.0.1'):
        try:
            self.__radio = Radio(DEBUG, isGroundStation, hostname)
        except Exception as e:
            print(e)

    def send(self, data):
        try:
            self.__radio.send(data)
        except Exception as e:
            print(e)

    def bind(self, queue):
        self.__radio.bindQueue(queue)

    def getLaunchFlag(self):
        self.__radio.getLaunchFlag()

    def getQDMFlag(self):
        self.__radio.getQDMFlag()

    def getAbortFlag(self):
        self.__radio.getAbortFlag()

    def getStabFlag(self):
        self.__radio.getStabFlag()
