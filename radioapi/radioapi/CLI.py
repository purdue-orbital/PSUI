
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
        if (command == "A") :
            #test json sending
            states[0] = not states[0]


        elif command == "L":
            states[1] = not states[1]

        elif command == "Q":
            states[2] = not states[2]

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