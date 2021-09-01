def main():
    command = "start"
    while command!="quit" :

        print("Enter command: ")
        command = input()
        if (command == "A") | (command == "S") | (command == "L") | (command == "Q"):
            #send command
            print("Command: " + command)

            #recieve return signal then loop again
        elif command != "quit":
            print("Invalid command.")


main()