
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

    # [ABORT, LAUNCH, QDM, STAB, ARMED]
    states = [False, False, False, False, False]

    listener = keyboard.Listener(on_press=lambda x: on_press(x, radio, states))
    listener.start()

    # The number of iterations, used for resending signals
    count = 0

    print("started")
    while True:
        if not listener.is_alive():
            break

        # Receives state changes from LSRadio and displays them
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

            # print(json.dumps(parsed, indent=2, sort_keys=True))
        sleep(DELAY)
        count += 1

        # Resend current state every AUTO_UPDATE_TIME seconds
        if count >= AUTO_UPDATE_TIME // DELAY:
            radio.send(json.dumps({
                "ABORT": states[0],
                "LAUNCH": states[1],
                "QDM": states[2],
                "STAB": states[3],
                "ARMED": states[4],
            }))
            count = 0


def on_press(key, radio, states):
    if key == keyboard.Key.esc:
        return False    # stops the listener on escape key

    try:    # assigns the name of the key pressed to variable k
        k = key.char
    except:
        k = key.name

    if k in ["a", "s", "q", "l", "r", "p", "x"]:
        canSend = True

        if k == "r":
            if not states[4]:
                states[4] = True
            else:
                print("Cannot unarm once armed.")
                canSend = False

        elif k == "a":
            # if not states[0]:
            # if not states[1] and not states[0] and states[4]:
            if not states[1] and not states[0]:
                states[0] = True
            elif not states[4]:
                print("Cannot abort while unarmed.")
                canSend = False
            elif states[1]:
                print(Fore.RED + "Cannot abort during/after launching")
                canSend = False
            else:
                print(Fore.RED + "Abort already activated.")
                canSend = False

        elif k == "s":
            if states[4] and not states[1]:
                states[3] = not states[3]
            elif not states[4]:
                print(Fore.RED + "Cannot stabilize while unarmed.")
                canSend = False
            else:
                print(Fore.RED + "Cannot unstabilize during launch.")
                canSend = False

        elif k == "q":
            # if not states[2]:
            if not states[2] and not states[1] and states[4]:
                states[2] = True
            elif not states[4]:
                print("Cannot QDM while unarmed.")
                canSend = False
            elif states[1]:
                print(Fore.RED + "Cannot QDM during launch.")
                canSend = False
            else:
                print(Fore.RED + "QDM already activated.")
                canSend = False

        elif k == "l":
            # if not states[1]:
            if not states[0] and states[3] and not states[1] and not states[2] and states[4]:
                states[1] = True
            elif not states[4]:
                print("Cannot launch while unarmed.")
                canSend = False
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
                  "\nQDM: " + str(states[2]) + "\nStab: " + str(states[3]) + "\nArmed: "
                  + str(states[4]) + "\n")
            canSend = False
        
        elif k == "x":
            radio.send('{ "message": "fuckoff" }')
            print("Closing Radio Socket...")
            sleep(5)
            radio.socket.close()
            print("Socket Closed\n")
            return False

        if canSend:
            radio.send(json.dumps({
                "ABORT": states[0],
                "LAUNCH": states[1],
                "QDM": states[2],
                "STAB": states[3],
                "ARMED": states[4],
            }))
            # print('Safe to disconeect with ^C! :) ')


if __name__ == '__main__':
    if len(sys.argv) < 1:
        print("Error: Must supply a hostname argument.")
        sys.exit()

    hostname = sys.argv[1]
    main(hostname)
