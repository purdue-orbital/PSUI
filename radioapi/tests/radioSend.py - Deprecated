import zmq
import pmt
import thread

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

            self.queue = None

            self.context = zmq.Context()

            def receive():
                recv_sock = self.context.socket(zmq.PULL)
                recv_sock.connect("tcp://127.0.0.1:5000")

                while True:
                    message = recv_sock.recv()
                    print(message)

                    if(self.queue is not None)
                        self.queue.put(message)

            thread.start_new_thread(receive)

            # create socket
            self.sock = self.context.socket(zmq.PUSH)
            self.sock.connect("tcp://127.0.0.1:5000")
        except Exception as e:
            print(e)


    def send(self, data):
        if not isinstance(data, str):
            raise TypeError('Invalid type: data must be a str, not %r' % type(data))

        try:
            message = str.encode(data)
            self.sock.send(pmt.serialize_str(pmt.to_pmt(message)))
            print(OK + "Sent")
        except KeyboardInterrupt:
            print ("interrupt received. shutting down.")
            # clean up
            self.sock.close()
            context.term()
            exit()


    def bind_queue(self, queue):
        self.queue = queue


    def close(self):
    try:
        self.sock.close()
    except Exception as e:
        print(e)