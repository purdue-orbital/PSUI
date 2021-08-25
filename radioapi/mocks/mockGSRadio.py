from radioapi.radios.RadioAlpha2 import Radio
import json
import time

def main():
    q = []
    gsradio = Radio(DEBUG=1, isGroundStation=True)
    gsradio.bindQueue(q)

    while True:
        if len(q) > 0:
            parsed = json.loads(q.pop(0))
            print("Received new Data:")
            print(json.dumps(parsed, indent=2, sort_keys=True))
        time.sleep(1)


if __name__ == "__main__":
    main()
