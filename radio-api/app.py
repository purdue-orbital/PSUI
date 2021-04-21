from flask import Flask, request
import sys

from Radio import Radio


class RadioSingleton(object):
    instance: Radio = None;
    queue: list = []

    def __init__(self) -> None:
        raise Exception("RadioSingleton Class should not be instanced directly")

    @staticmethod
    def get_instance():
        if (RadioSingleton.instance == None):
            RadioSingleton.instance = Radio(2)
            RadioSingleton.instance.bindQueue(RadioSingleton.queue)
        return RadioSingleton.instance
            

app = Flask(__name__, static_url_path='/')

@app.route('/rec', methods=['GET'])
def rec_data():
    return "Rec"

@app.route('/send', methods=['GET', 'POST'])
def send_data():
    try:
        dataStr = str(request.data)
        print(dataStr, file=sys.stderr) # TODO: Remove
        # RadioSingleton.get_instance().send(dataStr, isGroundStation=True)
    except Exception as e:
        print(e, file=sys.stderr)
    return ""