import zmq
import datetime
import time
import signal
import pmt

print("Current libzmq version is %s" % zmq.zmq_version())
print("Current  pyzmq version is %s" % zmq.__version__)

context = zmq.Context()

# create socket
sock = context.socket(zmq.PUSH)
sock.bind("tcp://127.0.0.1:5001")

while True:
    _tim = datetime.datetime.now()
    _out = str(_tim)
    message = str.encode (_out)
    try:
        #sock.send (message)
        sock.send (pmt.serialize_str(pmt.to_pmt('Hello World!')))
        print('sending....')
        time.sleep(1)
    except KeyboardInterrupt:
        print ("interrupt received. shutting down.")
        # clean up
        sock.close()
        context.term()
        exit()
