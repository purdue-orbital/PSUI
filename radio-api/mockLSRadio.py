from RadioBeta import Radio
import json
import time


def main():
    q = []
    lsradio = Radio(DEBUG=1)
    lsradio.bindQueue(q)

    while True:
        print(len(q))
        time.sleep(1)


if __name__ == "__main__":
    main()
