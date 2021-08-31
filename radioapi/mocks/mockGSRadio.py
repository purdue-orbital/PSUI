from radioapi.radios.RadioAlpha2 import Radio
import json
import time

import threading


def main():
    q = []
    gsradio = Radio(DEBUG=1, isGroundStation=True)
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
