
import sys
import json
from time import sleep
from pynput import keyboard
from colorama import Fore

from .GSRadio import GSRadio

DELAY = 1 # in seconds

# old main, not used
def main_old():
    command = "start"

    radio = GSRadio()
    while command!="quit" :

        command = input("Enter command: ")
        if (command == "A") :
            #test json sending
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

            #recieve return signal then loop again
        elif command != "quit":
            print("Invalid command.")


def main(ext_host_name):

    q = []
    radio = GSRadio(hostname=ext_host_name)
    radio.bindQueue(q)
    states = [False, False, False, False]

    listener = keyboard.Listener(on_press = lambda x: on_press(x, radio, states))
    listener.start()

    # The number of iterations, used for resending signals
    count = 0

    print("started")
    while True:
        # Receives state changes from LSRadio and displays them
        if len(q) > 0:
            state = json.loads(q.pop(0))
            print("Received new State:")
            color = Fore.RED if state["ABORT"] else Fore.GREEN
            print(str(color) + f"ABORT = {state}")
            color = Fore.RED if state["LAUNCH"] else Fore.GREEN
            print(str(color) + f"LAUNCH = {state}")
            color = Fore.RED if state["QDM"] else Fore.GREEN
            print(str(color) + f"QDM = {state}")
            color = Fore.RED if state["STAB"] else Fore.GREEN
            print(str(color) + f"STAB = {state}")

            # print(json.dumps(parsed, indent=2, sort_keys=True))
        sleep(DELAY)
        count += 1

        # Resend current state every 60 seconds
        if count >= 60 // DELAY:
            radio.send(json.dumps({
                "ABORT": states[0],
                "LAUNCH": states[1],
                "QDM": states[2],
                "STAB": states[3],
            }))
            count = 0

def on_press(key, radio, states):
    if key == keyboard.Key.esc:
        return False    # stops the listener on escape key

    try:    # assigns the name of the key pressed to variable k
        k = key.char
    except:
        k = key.name

    if k in ["a", "s", "q", "l", "p"]:
        canSend = True

        if k == "a":
            # if not states[0]:
            if not states[1] and not states[0]:
                states[0] = True
            elif states[1]:
                print(Fore.RED + "Cannot abort during/after launching")
                canSend = False
            else:
                print(Fore.RED + "Abort already activated.")
                canSend = False

        elif k == "s":
            if states[0]:
                print(Fore.RED + "Cannot unstabilize during launch.")
                canSend = False
            states[3] = not states[3]

        elif k == "q":
            # if not states[2]:
            if not states[2] and not states[1]:
                states[2] = True
            elif states[1]:
                print(Fore.RED + "Cannot QDM during launch.")
                canSend = False
            else:
                print(Fore.RED + "QDM already activated.")
                canSend = False

        elif k == "l":
            # if not states[1]:
            if not states[0] and states[3] and not states[1] and not states[2]:
                states[1] = True
            elif states[2] and states[0]:
                print(Fore.RED + "Cannot launch when QDM and aborted.")
                canSend = False
            elif states[2]:
                print(Fore.RED + "Cannot launch with QDM.")
                canSend = False
            elif states[0]:
                print(Fore.RED + "Cannot launch when aborted.")
                canSend = False
            elif not states[3]:
                print(Fore.RED + "Cannot launch when unstable.")
                canSend = False
            else:
                print(Fore.RED + "Launch already activated.")
                canSend = False

        elif k == "p":
            print("\nAbort: " + str(states[0]) + "\nLaunch: " + str(states[1]) +
                  "\nQDM: " + str(states[2]) + "\nStab: " + str(states[3]) + "\n")
            canSend = False

        if canSend:
            radio.send(json.dumps({
                "ABORT": states[0],
                "LAUNCH": states[1],
                "QDM": states[2],
                "STAB": states[3],
            }))


if __name__=='__main__':
    if len(sys.argv) < 1:
        print("Error: Must supply a hostname argument.")
        sys.exit()

    hostname = sys.argv[1]
    main(hostname)
