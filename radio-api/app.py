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

    @staticmethod
    def get_instance() -> Radio:
        if (RadioWrapper.instance == None):
            RadioWrapper.instance = Radio(DEBUG=0, isGroundStation=True)
            RadioWrapper.instance.bindQueue(RadioWrapper.queue)
        return RadioWrapper.instance

    @staticmethod
    def get_data():
        if len(RadioWrapper.queue) > 0:
            RadioWrapper.lastDataPoint = RadioWrapper.queue.pop(0)
        return RadioWrapper.lastDataPoint


app = Flask(__name__,
            static_url_path='/')
CORS(app)


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
