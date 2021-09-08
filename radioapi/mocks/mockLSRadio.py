from radioapi.LSRadio import LSRadio as Radio
import json
import time
q = []

def main():

    lsradio = Radio(DEBUG=1)
    lsradio.bindQueue(q)

    while True:
        if len(q) > 0:
            parsed = json.loads(q.pop(0))
            print("Received new State:")
            print(json.dumps(parsed, indent=2, sort_keys=True))
            
        time.sleep(1)


if __name__ == "__main__":
    main()
