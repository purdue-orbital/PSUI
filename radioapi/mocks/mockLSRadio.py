from radioapi.LSRadio import LSRadio as Radio
import json
import time
from colorama import init, Fore

import threading

DELAY = 1
init(convert=True, autoreset=True)
IP = '0.0.0.0'

def main():
    q = []
    lsradio = Radio(hostname=IP)
    lsradio.bindQueue(q)

    t = threading.Thread(target=send_state,
                        args=(lsradio, ),
                        daemon=True)
    t.start()
    time.sleep(1)

    while True:
        if len(q) > 0:
            state = json.loads(q.pop(0))
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
