# from radioapi._deprecated.radios.RadioAlpha2 import Radio
from radioapi.GSRadio import GSRadio as Radio
import json
import time
import sys

import threading


DELAY = 1
SERVER_IP = '10.186.74.74'

def main():
    q = []
    # gsradio = Radio(DEBUG=1, isGroundStation=True
    gsradio = Radio(port=sys.argv[1] if len(sys.argv) > 1 else '/dev/ttyUSB0')
    gsradio.bindQueue(q)

    t = threading.Thread(target=send_state,
                         args=(gsradio, ),
                         daemon=True)
    t.start()

    while True:
        if len(q) > 0:
            parsed = q.pop(0)
            print("Received new Data:")
            print(parsed)
        time.sleep(1)


def send_state(radio: Radio):
    states = [
        {
            "LAUNCH": 0,
            "QDM": 0,
            "ABORT": 0,
            "STAB": 0,
            "ARMED": 0,
        },
        {
            "LAUNCH": 0,
            "QDM": 0,
            "ABORT": 0,
            "STAB": 1,
            "ARMED": 0,
        },
        {
            "LAUNCH": 1,
            "QDM": 0,
            "ABORT": 0,
            "STAB": 1,
            "ARMED": 0,
        },
        {
            "LAUNCH": 1,
            "QDM": 1,
            "ABORT": 0,
            "STAB": 1,
            "ARMED": 0,
        }
    ]
    for state in states:
        radio.send(state)
        time.sleep(5)
    print("No more states to send!")


if __name__ == "__main__":
    main()
