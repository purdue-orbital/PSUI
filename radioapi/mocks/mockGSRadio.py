# from radioapi._deprecated.radios.RadioAlpha2 import Radio
from radioapi.GSRadio import GSRadio as Radio
import json
import time

import threading


DELAY = 1
SERVER_IP = '10.186.74.74'

def main():
    q = []
    # gsradio = Radio(DEBUG=1, isGroundStation=True
    gsradio = Radio(hostname=SERVER_IP)
    gsradio.bindQueue(q)

    t = threading.Thread(target=send_state,
                         args=(gsradio, ),
                         daemon=True)
    t.start()

    while True:
        if len(q) > 0:
            parsed = json.loads(q.pop(0))
            print("Received new Data:")
            print(json.dumps(parsed, indent=2, sort_keys=True))
        time.sleep(1)


def send_state(radio: Radio):
    states = [
        {
            "LAUNCH": False,
            "QDM": False,
            "ABORT": False,
            "STAB": False,
        },
        {
            "LAUNCH": False,
            "QDM": False,
            "ABORT": False,
            "STAB": True,
        },
        {
            "LAUNCH": True,
            "QDM": False,
            "ABORT": False,
            "STAB": True,
        },
        {
            "LAUNCH": True,
            "QDM": True,
            "ABORT": False,
            "STAB": True,
        }
    ]
    for state in states:
        radio.send(json.dumps(state))
        time.sleep(5)
    print("No more states to send!")


if __name__ == "__main__":
    main()
