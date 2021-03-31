import zmq
import pmt
import _thread as thread
import os
import json
import logging

OK = "\u001b[32m"
WARN = "\u001b[33m"
ERR = "\u001b[31m"
NORM = "\u001b[0m"


class Radio:
    def __init__(self, DEBUG=False):
        try:
            if not DEBUG and os.path.exists("state.json"):
                with open('state.json', 'r', encoding='utf-8') as stateFile:
                    state = json.loads(stateFile.read())

                    self.launch = state['LAUNCH']
                    self.qdm = state['QDM']
                    self.abort = state['ABORT']

                    stateFile.close()
            else:
                self.launch = False
                self.qdm = False
                self.abort = False

                if not DEBUG:
                    state = {}
                    state['LAUNCH'] = False
                    state['QDM'] = False
                    state['ABORT'] = False

                    with open('state.json', 'w+', encoding='utf-8') as f:
                        json.dump(state, f, ensure_ascii=False, indent=4)

            logging.basicConfig(level=(logging.INFO, logging.DEBUG)[DEBUG], filename='mission.log', format='%(asctime)s %(levelname)s:%(message)s')

            self.queue = None

            self.context = zmq.Context()

            def receive():
                recv_sock = self.context.socket(zmq.PULL)
                # BIND CHECK
                recv_sock.bind("tcp://127.0.0.1:5000")

                while True:
                    message = pmt.to_python(pmt.deserialize_str(recv_sock.recv()))
                    logging.info("Received: " + str(message))

                    jsonData = json.loads(message)

                    if self.launch != jsonData['Launch'] or self.qdm != jsonData['QDM'] or self.abort != jsonData['Abort']:
                        log.warning("State mismatch, resending state")
                        self.sendState()

                    if self.queue is not None:
                        self.queue.append(message)

            thread.start_new_thread(receive, ())

            # create socket
            self.sock = self.context.socket(zmq.PUSH)
            self.sock.connect("tcp://127.0.0.1:5000")
        except Exception as e:
            print(e)
            logging.error(e)

    def send(self, data, isGroundStation=False):
        print(data)
        try:
            jsonData = json.loads(data)

            # Oneway communication, Ground Station controls state.
            if isGroundStation:
                self.launch = jsonData['Launch']
                self.qdm = jsonData['QDM']
                self.abort = jsonData['Abort']
            else:
                print("Append state")
        except Exception as e:
            print(e)
            logging.error(e)
            return 0

        try:
            logging.info("Sent: " + data)
            self.sock.send(pmt.serialize_str(pmt.to_pmt(data)))
            print("Sent");
            return 1
        except KeyboardInterrupt:
            print ("interrupt received. shutting down.")
            self.sock.close()
            context.term()
            exit()
        except Exception as e:
            print(e)
            logging.error(e)
            return 0

    def sendState(self):
        state = {}
        state['LAUNCH'] = self.launch
        state['QDM'] = self.qdm
        state['ABORT'] = self.abort

        try:
            logging.info(state)
            message = str.encode(state)
            self.sock.send(pmt.serialize_str(pmt.to_pmt(message)))
            logging.debug("State sent")
            return 1

        except KeyboardInterrupt:
            print ("interrupt received. shutting down.")
            self.sock.close()
            context.term()
            exit()
        except Exception as e:
            print(e)
            logging.error(e)
            return 0

    def getLaunchFlag(self):
        return self.launch

    def getQDMFlag(self):
        return self.qdm

    def getAbortFlag(self):
        return self.abort


    def bind_queue(self, queue):
        self.queue = queue


    def close(self):
        try:
            self.sock.close()
        except Exception as e:
            print(e)
            logging.error(e)
