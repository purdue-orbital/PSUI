
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

    listener = keyboard.Listener(on_press = lambda x: on_press(x, radio))
    listener.start()

    print("started")
    while True:
        sleep(1)

def on_press(key, radio):
    if key == keyboard.Key.esc:
        return False    # stops the listener on escape key

    try:    # assigns the name of the key pressed to variable k
        k = key.char
    except:
        k = key.name

    if k in ["a", "s", "q", "l"]:
        if k == "a":
            print("A key pressed")
            radio.send(json.dumps({
                "LAUNCH": False,
                "QDM": False,
                "ABORT": True,
                "STAB": False,
            }))

        elif k == "s":
            print("S key pressed")
            radio.send(json.dumps({
                "LAUNCH": False,
                "QDM": False,
                "ABORT": False,
                "STAB": True,
            }))

        elif k == "q":
            print("Q key pressed")
            radio.send(json.dumps({
                "LAUNCH": False,
                "QDM": True,
                "ABORT": False,
                "STAB": False,
            }))

        elif k == "l":
            print("L key pressed")
            radio.send(json.dumps({
                "LAUNCH": True,
                "QDM": False,
                "ABORT": False,
                "STAB": False,
            }))

if __name__=='__main__':
    main()