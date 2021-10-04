import threading as thread
import json
import socket
import sys
from .Radio import Radio

# Unused for now
# import zmq
# import os
# import logging
# import time


class LSRadio(Radio):
    def __init__(self, DEBUG=0, hostname='127.0.0.1', port = 5000):
        """
        DEBUG 0 is for communication between two computers, for which hostname must also be defined. DEBUG 1 is for local communication uses localhost hostname.
        """
        super().__init__(DEBUG=DEBUG, hostname=hostname)

        # logging.basicConfig(level=logging.INFO if not self.DEBUG else logging.DEBUG,
        #                     filename='mission.log',
        #                     format='%(asctime)s %(levelname)s:%(message)s')

        try:
            self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            self.socket.bind(
                (
                    (hostname, socket.gethostname())[self.DEBUG != 1],
                    port
                )
            )
            machine_ip = socket.gethostbyname(socket.gethostname())
            print(f"Machine ip {machine_ip} bound to {hostname} at port {port}")

            thread.Thread(target=self.receive, daemon=True).start()
        except Exception as e:
            # print(e)
            print("test")

    def receive(self):
        self.socket.listen(300)  # Listen for 5 minutes
        (clientsocket, address) = self.socket.accept()
        self.socket = clientsocket

        while True:
            try:
                message = ord(self.socket.recv(2048).decode("ascii"))  # very large byte size?? only sending one int
                # logging.info("Received: " + str(message))
                # jsonData = json.loads(message)
                jsonData = self._int_to_dict(message)
                self.launch = jsonData['LAUNCH']
                self.qdm = jsonData['QDM']
                self.stab = jsonData['STAB']
                self.abort = jsonData['ABORT']
                if self.queue is not None:
                    self.queue.append(json.dumps(jsonData))
                else:
                    print("Queue unbound")
                    # logging.error("Queue unbound")
            except OSError as e:
                print("Connection Forcibly Closed, Exiting")
                print(e)
                break

            except Exception as e:
                print(f"Invalid message received:\n{e}")
                # logging.error(e)

    def send(self, data):
        """
        Sends JSON formatted data to the socket attached to radio interface.
        For single variable values, do not exceed one layer of depth.
        For multi-variable values, do not exceed two layers of depth.

        JSON formatting is maintained by Matt Drozt. TODO: Example will be included at a later date.

        Ground Station must append state.
        """
        # logging.info(data)
        try:
            jsonData = json.loads(data)

            # Oneway communication, Ground Station controls state.

            jsonData['LAUNCH'] = self.launch
            jsonData['QDM'] = self.qdm
            jsonData['ABORT'] = self.abort
            jsonData['STAB'] = self.stab

            # logging.info("Sent: " + data)
            self.socket.send(data.encode('ascii'))
            print("Sent")
            return 1

        except KeyboardInterrupt:
            print("interrupt received. shutting down.")
            self.socket.close()
            sys.exit()

        except Exception as e:
            # logging.error(e)
            return 0
