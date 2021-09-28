from radioapi.LSRadio import LSRadio as Radio
import json
import time

import threading

DELAY = 1


def main():
    q = []

    lsradio = Radio(DEBUG=1)
    lsradio.bindQueue(q)

    t = threading.Thread(target=send_state,
                         args=(lsradio, ),
                         daemon=True)
    t.start()
    time.sleep(1)

    while True:
        if len(q) > 0:
            parsed = json.loads(q.pop(0))
            print("Received State:")
            print(json.dumps(parsed, indent=2, sort_keys=True))
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
