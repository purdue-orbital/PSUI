from flask import Flask, request, Response, jsonify
from flask.json import jsonify
from flask_cors import CORS
import sys
import json

from RadioBeta import Radio


class RadioWrapper(object):
    instance: Radio = None
    queue: 'list[dict]' = []
    lastDataPoint: dict = {
        'Acceleration': {
            'X': 0,
            'Y': 0,
            'Z': 0
        },
        'Gyro': {
            'X': 0,
            'Y': 0,
            'Z': 0
        },
        'Altitude': 0,
        'Temperature': 0,
        'Latitude': 0,
        'Longitude': 0
    }

    def __init__(self) -> None:
        raise Exception("RadioWrapper Class should not be instanced directly")

    @classmethod
    def get_instance(cls) -> Radio:
        if (cls.instance == None):
            print("Making instancve")
            cls.instance = Radio(DEBUG=1, isGroundStation=True)
            cls.instance.bindQueue(RadioWrapper.queue)
        return cls.instance

    @classmethod
    def get_data(cls):
        if len(cls.queue) > 0:
            cls.lastDataPoint = cls.queue.pop(0)
        return cls.lastDataPoint


app = Flask(__name__,
            static_url_path='/')
CORS(app)
RadioWrapper.get_instance()


@app.route('/rec', methods=['GET'])
def rec_data() -> Response:
    res: Response = None
    try:
        res = jsonify(RadioWrapper.get_data())
    except Exception as e:
        print(e, file=sys.stderr)
        res = Response(status=500)
    return res


@app.route('/send', methods=['POST'])
def send_data() -> Response:
    res: Response = None
    try:
        dataStr = json.dumps(request.json)
        print(dataStr, file=sys.stderr)  # TODO: Remove
        RadioWrapper.get_instance().send(dataStr)
        res = Response(response="", status=204)
    except Exception as e:
        print(e, file=sys.stderr)
        res = Response(status=500)
    return res


if __name__ == "__main__":
    app.run(port=5002)
