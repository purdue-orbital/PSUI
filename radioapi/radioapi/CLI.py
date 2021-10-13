
import sys
import json
from time import sleep
from pynput import keyboard
from colorama import init, Fore
from .GSRadio import GSRadio


PLATFORM_OS = sys.platform
IS_WINDOWS = True
WINDOWS = ['win32', 'cygwin']
UNIX = ['linux', 'aix']
MAC = ['darwin']

if PLATFORM_OS in WINDOWS:
    IS_WINDOWS = True
elif PLATFORM_OS in UNIX or PLATFORM_OS in MAC:
    IS_WINDOWS = False

DELAY = 1 # in seconds
AUTO_UPDATE_TIME = 60  # in seconds
init(convert=IS_WINDOWS, autoreset=True)

# old main, not used


def main_old():
    command = "start"

    radio = GSRadio()
    while command != "quit":

        command = input("Enter command: ")
        if (command == "A"):
            # test json sending
            radio.send(json.dumps({
                "LAUNCH": False,
                "QDM": False,
                "ABORT": True,
                "STAB": False,
            }))

        elif command == "S":
            radio.send(json.dumps({
                "LAUNCH": False,
                "QDM": False,
                "ABORT": False,
                "STAB": True,
            }))

        elif command == "Q":
            radio.send(json.dumps({
                "LAUNCH": False,
                "QDM": True,
                "ABORT": False,
                "STAB": False,
            }))

        elif command == "L":
            radio.send(json.dumps({
                "LAUNCH": True,
                "QDM": False,
                "ABORT": False,
                "STAB": False,
            }))

            # recieve return signal then loop again
        elif command != "quit":
            print("Invalid command.")

        print("command is " + command)


def main(ext_host_name):

    q = []
    radio = GSRadio(hostname=ext_host_name)
    radio.bindQueue(q)

    # [ABORT, ARMED]
    states = [False, False]

    listener = keyboard.Listener(on_press=lambda x: on_press(x, radio, states))
    listener.start()

    # The number of iterations, used for resending signals
    count = 0

    print("started")
    while True:
        # Receives state changes from LSRadio and displays them
        if len(q) > 0:
            state = json.loads(q.pop(0))
            print("Received new State:")
            color = Fore.GREEN if state["ABORT"] else Fore.RED
            print(str(color) + f"ABORT = {state['ABORT']}")

            # print(json.dumps(parsed, indent=2, sort_keys=True))
        sleep(DELAY)
        count += 1

        # Resend current state every AUTO_UPDATE_TIME seconds
        if count >= AUTO_UPDATE_TIME // DELAY:
            radio.send(json.dumps({
                "ABORT": states[0],
                "ARMED": states[1],
            }))
            count = 0


def on_press(key, radio, states):
    if key == keyboard.Key.esc:
        return False    # stops the listener on escape key

    try:    # assigns the name of the key pressed to variable k
        k = key.char
    except:
        k = key.name

    if k in ["a", "r", "p"]:
        canSend = True

        if k == "r":
            states[1] = True

        elif k == "a":
            states[0] = True

        elif k == "p":
            print("\nAbort: " + str(states[0                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     ]) + "\nArmed: "+ str(states[1]) + "\n")
            canSend = False

        if canSend:
            radio.send(json.dumps({
                "ABORT": states[0],
                "ARMED": states[1],
            }))

            print("Disconnecting")
            radio.close()


if __name__ == '__main__':
    if len(sys.argv) < 1:
        print("Error: Must supply a hostname argument.")
        sys.exit()

    hostname = sys.argv[1]
    main(hostname)
