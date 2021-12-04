import radioapi.CLI as cli
import sys


def main():
    opts = [opt for opt in sys.argv[1:] if opt.startswith("-")]
    args = [arg for arg in sys.argv[1:] if not arg.startswith("-")]

    port = args[0] if args else "/dev/ttyUSB0"
    cli.main(port)


if __name__ == '__main__':
    main()
