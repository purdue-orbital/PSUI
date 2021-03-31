from Radio import Radio
import _thread as thread
import json
import time

radio = Radio(True)


def recv():
    queue = []

    radio.bind_queue(queue)

    while True: 
        try:
            print(len(queue))
            if len(queue) > 0:
                print("Popping...")
                print(queue.pop(0))
            else:
                print("Queue empty")
        except Exception as e:
            print(e)


        time.sleep(1)


thread.start_new_thread(recv, ())

time.sleep(3)

jsonData = {}
jsonData['QDM'] = False
jsonData['Launch'] = False
jsonData['Abort'] = False
radio.send(json.dumps(jsonData), True)

time.sleep(3)
