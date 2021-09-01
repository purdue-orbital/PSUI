import zmq
import _thread as thread
import os
import json
import logging
import socket
import time
from Radio import Radio

class GSRadio(Radio):
    def __init__(self, DEBUG = 0, hostname = '127.0.0.1'):
        """
        DEBUG 0 is for communication between two computers, for which hostname must also be defined. DEBUG 1 is for local communication uses localhost hostname.
        """
        super().__init__(DEBUG=DEBUG, hostname=hostname)


        #logging.basicConfig(level=(logging.INFO, logging.DEBUG)[self.DEBUG > 0], filename='mission.log', format='%(asctime)s %(levelname)s:%(message)s')


        try: 
            
            print(str(socket.AF_INET) + "  " + str(socket.SOCK_STREAM) + "   " + str(self.hostname))
            self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            self.socket.connect(('127.0.0.1', 5000))

            thread.start_new_thread(self.receive, ())
        except Exception as e:
            print(e)
            print("test")

    def receive(self):
        while True:
            try:
                message = self.socket.recv(2048).decode("ascii")
                # logging.info("Received: " + str(message))

                jsonData = json.loads(message)
                
                # if self.launch != jsonData['LAUNCH'] or self.qdm != jsonData['QDM'] or self.abort != jsonData['ABORT'] or self.stab != jsonData['STAB']:
                    #logging.warning("State mismatch, resending state")
                    # TODO Send State

                if self.queue is not None:
                    self.queue.append(message)
                else:
                    print("Queue unbound")
                    # logging.error("Queue unbound")    
            except Exception as e:
                print("Invalid message received")
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
            try:
                self.launch = jsonData['LAUNCH']
                self.qdm = jsonData['QDM']
                self.abort = jsonData['ABORT']
                self.stab = jsonData['STAB']
            except Exception as e:
                print("Ground Station did not append state attributes to data")
                # logging.error("Ground Station did not append state attributes to data")

            # logging.info("Sent: " + data)
            self.socket.send(data.encode('ascii'))
            print("Sent");
            return 1

        except KeyboardInterrupt:
            print ("interrupt received. shutting down.")
            self.sock.close()
            exit()

        except Exception as e:
            # logging.error(e)
            return 0
