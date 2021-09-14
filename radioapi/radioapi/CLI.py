
import sys
import json

from .GSRadio import GSRadio

def main():
    command = "start"

    radio = GSRadio()
    while command!="quit" :

        print("Enter command: ")
        command = input()
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

if __name__=='__main__':
    main()