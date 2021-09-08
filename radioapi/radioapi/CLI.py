
import sys
import json

from GSRadio import GSRadio
states = [False, False, False, False]
def main():
    command = "start"

    radio = GSRadio()
    while command!="quit" :

        canSend = True
        print("Enter command: ")
        command = input()
        if command == "A":
            if not states[0]:
                states[0] = True
            else:
                print("Abort already activated.")
                canSend = False

        elif command == "L":
            if not states[1]:
                states[1] = True
            else:
                print("Launch already activated.")
                canSend = False

        elif command == "Q":
            if not states[2]:
                states[2] = True
            else:
                print("QDM already activated.")
                canSend = False

        elif command == "S":
            states[3] = not states[3]

        elif command == "state":
            print("\nAbort: " + str(states[0]) + "\nLaunch: " + str(states[1]) +
                  "\nQDM: " + str(states[2]) + "\nStab: " + str(states[3]) + "\n")
            canSend = False
        elif command != "quit":
            print("Invalid command.")
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