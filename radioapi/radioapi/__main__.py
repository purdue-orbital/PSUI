# from flask import Flask, request, Response, jsonify
# from flask.json import jsonify
# from flask_cors import CORS
# import sys
# import json
#
# from typing import List
# from typing import Optional
#
# from radioapi.radios.RadioAlpha2 import Radio
#
#
# class RadioWrapper(object):
#     _instance: Optional[Radio] = None
#     _queue: List[dict] = []
#     lastDataPoint: dict = {
#         'Acceleration': {
#             'X': 0,
#             'Y': 0,
#             'Z': 0
#         },
#         'Gyro': {
#             'X': 0,
#             'Y': 0,
#             'Z': 0
#         },
#         'Altitude': 0,
#         'Temperature': 0,
#         'Latitude': 0,
#         'Longitude': 0
#     }
#
#     def __init__(self) -> None:
#         raise Exception("RadioWrapper Class should not be instanced directly")
#
#     @classmethod
#     def get_instance(cls) -> Radio:
#         if cls._instance is None:
#             cls._instance = Radio(DEBUG=1, isGroundStation=True)  # TODO: Change this for prod
#             cls._instance.bindQueue(RadioWrapper._queue)
#         return cls._instance
#
#     @classmethod
#     def get_data(cls):
#         if len(cls._queue) > 0:
#             cls.lastDataPoint = cls._queue.pop(0)
#         return cls.lastDataPoint
#
#
# app = Flask(__name__,
#             static_url_path='/')
# CORS(app)
# RadioWrapper.get_instance()
#
#
# @app.route('/rec', methods=['GET'])
# def rec_data() -> Response:
#     res: Optional[Response] = None
#     try:
#         res = jsonify(RadioWrapper.get_data())
#     except Exception as e:
#         print(e, file=sys.stderr)
#         res = Response(status=500)
#     return res
#
#
# @app.route('/send', methods=['POST'])
# def send_data() -> Response:
#     res: Optional[Response] = None
#     try:
#         dataStr = json.dumps(request.json)
#         # print(dataStr, file=sys.stderr)
#         RadioWrapper.get_instance().send(dataStr)
#         res = Response(response="", status=204)
#     except Exception as e:
#         print(e, file=sys.stderr)
#         res = Response(status=500)
#     return res
#
#
# if __name__ == "__main__":
#     app.run(port=5002)

import radioapi.CLI as cli
import sys

if __name__ == '__main__':

    opts = [opt for opt in sys.argv[1:] if opt.startswith("-")]
    args = [arg for arg in sys.argv[1:] if not arg.startswith("-")]

    # print(args)

    if not len(args) and not len(opts):
        print("Error: Must supply a hostname or -l argument.")
        sys.exit()

    if "-l" in opts:
        cli.main('127.0.0.1')
    else:
        hostname = args[0]
        cli.main(hostname)
