import zmq
import datetime
import time
import signal
import pmt

OK = "\u001b[32m"
WARN = "\u001b[33m"
ERR = "\u001b[31m"
NORM = "\u001b[0m"

class Module:
    __instance = None

    def get_instance(self):
        if Module.__instance is None:
            print(Module.__instance)
            Module()
        return Module.__instance

    def __init__(self):
        if Module.__instance is not None:
            print(Module.__instance)
            raise Exception("Constructor should not be called")
        else:
            Module.__instance = ModuleSingleton()


class ModuleSingleton:
    def __init__(self):

        try:
            print("Current libzmq version is %s" % zmq.zmq_version())
            print("Current  pyzmq version is %s" % zmq.__version__)

            context = zmq.Context()

            # create socket
            sock = context.socket(zmq.PUSH)
            sock.bind("tcp://127.0.0.1:5000")
        except Exception as e:
            print(e)

    def send(self, data):
        if not isinstance(data, str):
            raise TypeError('Invalid type: data must be a str, not %r' % type(data))


        try:
            message = str.encode(data)
            sock.send (pmt.serialize_str(pmt.to_pmt(message)))
            print(OK + "Sent")
        except KeyboardInterrupt:
            print ("interrupt received. shutting down.")
            # clean up
            sock.close()
            context.term()
            exit()