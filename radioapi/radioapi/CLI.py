
import sys
import json
from time import sleep
from pynput import keyboard

from .GSRadio import GSRadio

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

def main():
    radio = GSRadio()
    states = [False, False, False, False]

    listener = keyboard.Listener(on_press = lambda x: on_press(x, radio, states))
    listener.start()

    print("started")
    while True:
        sleep(1)

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
            if not states[0]:
                states[0] = True
            else:
                print("Abort already activated.")
                canSend = False

        elif k == "s":
            states[3] = not states[3]

        elif k == "q":
            if not states[2]:
                states[2] = True
            else:
                print("QDM already activated.")
                canSend = False

        elif k == "l":
            if not states[1]:
                states[1] = True
            else:
                print("Launch already activated.")
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
    main()