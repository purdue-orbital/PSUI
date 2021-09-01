from radios.RadioAlpha2 import Radio
import json
import time

class mockLSRadio:
    def __init__(self, q = []):
        lsradio = Radio(DEBUG=1)
        lsradio.bindQueue(q)

    def run(self):
        while True:
            if len(q) > 0:
                parsed = json.loads(self.q.pop(0))
                print("Received new State:")
                print(json.dumps(parsed, indent=2, sort_keys=True))

            time.sleep(1)
