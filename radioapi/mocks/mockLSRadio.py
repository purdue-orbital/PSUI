from radioapi.LSRadio import LSRadio as Radio
import json
import time
import sys
from colorama import init, Fore

import threading

DELAY = 1
init(convert=True, autoreset=True)
IP = '0.0.0.0'


def main():
    q = []
    lsradio = Radio(port=sys.argv[1] if len(sys.argv) > 1 else '/dev/ttyUSB0')
    lsradio.bindQueue(q)

    t = threading.Thread(target=send_state,
                         args=(lsradio, ),
                         daemon=True)
    t.start()
    time.sleep(1)

    while True:
        if len(q) > 0:
            state = q.pop(0)
            print("Received new State:")
            color = Fore.GREEN if state["ABORT"] else Fore.RED
            print(str(color) + f"ABORT = {state['ABORT']}")
            color = Fore.GREEN if state["LAUNCH"] else Fore.RED
            print(str(color) + f"LAUNCH = {state['LAUNCH']}")
            color = Fore.GREEN if state["QDM"] else Fore.RED
            print(str(color) + f"QDM = {state['QDM']}")
            color = Fore.GREEN if state["STAB"] else Fore.RED
            print(str(color) + f"STAB = {state['STAB']}")
            # parsed = json.loads(q.pop(0))
            # print("Received State:")
            # print(json.dumps(parsed, indent=2, sort_keys=True))
        time.sleep(DELAY)


def send_state(radio: Radio):
    states = [
        {
            "LAUNCH": False,
            "QDM": False,
            "ABORT": False,
            "STAB": False,
            "ARMED": False,
            "DATA":  {
                "origin": "balloon",
                "GPS": {
                    "long": 0,
                    "lat": 0,
                    "alt": 0
                },
                "gyro": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "temp": 0,
                "acc": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                }
            }
        },
        {
            "LAUNCH": False,
            "QDM": False,
            "ABORT": False,
            "STAB": False,
            "ARMED": True,
            "DATA":  {
                "origin": "balloon",
                "GPS": {
                    "long": 0,
                    "lat": 0,
                    "alt": 0
                },
                "gyro": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "temp": 0,
                "acc": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                }
            }
        },
        {
            "LAUNCH": False,
            "QDM": False,
            "ABORT": False,
            "STAB": True,
            "ARMED": True,
            "DATA":  {
                "origin": "balloon",
                "GPS": {
                    "long": 0,
                    "lat": 0,
                    "alt": 0
                },
                "gyro": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "temp": 0,
                "acc": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                }
            }
        },
        {
            "LAUNCH": False,
            "QDM": True,
            "ABORT": False,
            "STAB": True,
            "ARMED": True,
            "DATA":  {
                "origin": "balloon",
                "GPS": {
                    "long": 0,
                    "lat": 0,
                    "alt": 0
                },
                "gyro": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "temp": 0,
                "acc": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                }
            }
        },
    ]
    for state in states:
        radio.send(state)
        time.sleep(5)
    print("No more states to send!")


if __name__ == "__main__":
    main()
