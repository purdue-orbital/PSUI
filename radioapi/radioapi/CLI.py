import sys

sys.path.insert(1, '../mocks/')

import mockLSRadio

def main():
    command = "start"
    LSRadio = mockLSRadio()

    while command!="quit" :

        command = input("Enter command: ")

        if (command == "A") or (command == "S") or (command == "L") or (command == "Q"):
            #send command
            print("Command: " + command)

            #recieve return signal then loop again
        elif command != "quit":
            print("Invalid command.")

        # print("-"*20)

    LSRadio.q.append(command)
    LSRadio.run()

if __name__=='__main__':
    main()
