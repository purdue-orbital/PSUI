from typing import List
from radioapi.LSRadio import LSRadio as Radio
from radioapi.coms.serialcoms import SerialComMessage

import time
import sys
import threading
import random

DELAY = 1


def main():
    q: List[SerialComMessage] = []
    lsradio = Radio(port=sys.argv[1] if len(sys.argv) > 1 else '/dev/ttyUSB0')
    lsradio.bindQueue(q)

    print("Starting")
    t = threading.Thread(target=send_state,
                         args=(lsradio, ),
                         daemon=True)
    t.start()
    time.sleep(1)

    while True:
        if len(q) > 0:
            state = q.pop(0)
            print("===============================")
            print("Received new State:")
            print("===============================")
            print(f"ARMED = {state.ARMED}")
            print(f"ABORT = {state.ABORT}")
            print(f"LAUNCH = {state.LAUNCH}")
            print(f"QDM = {state.QDM}")
            print(f"STAB = {state.STAB}")
            print("===============================\n\n")
            # parsed = json.loads(q.pop(0))
            # print("Received State:")
            # print(json.dumps(parsed, indent=2, sort_keys=True))
        time.sleep(DELAY)


def send_state(radio: Radio):
    while True:
        if not radio.send({
            "LAUNCH": radio.getLaunchFlag(),
            "QDM": radio.getQDMFlag(),
            "ABORT": radio.getAbortFlag(),
            "STAB": radio.getStabFlag(),
            "ARMED": radio.getArmedFlag(),
            "DATA":  {
                "origin": "balloon",
                "GPS": {
                "long": random.uniform(0, 1),
                "lat": random.uniform(0, 1),
                "alt": random.uniform(0, 1),
                },
                "gyro": {
                "x": random.uniform(0, 1),
                "y": random.uniform(0, 1),
                "z": random.uniform(0, 1),
                },
                "temp": random.uniform(0, 1),
                "acc": {
                "x": random.uniform(0, 1),
                "y": random.uniform(0, 1),
                "z": random.uniform(0, 1),
                }
            }
        }):
            print("WARNING: Failed to send state!")
        time.sleep(1)


if __name__ == "__main__":
    main()
