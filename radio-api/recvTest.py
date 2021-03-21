from RadioModule import Module

module = Module()
radio = module.get_instance()

queue = []

radio.bind_queue(queue)

while True: 
    print(queue.pop(0))