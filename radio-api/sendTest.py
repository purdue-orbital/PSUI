from RadioModule import Module

module = Module()
radio = module.get_instance()

radio.send("Hello World")
