from radioapi.radios.Radio import Radio 
import json

jsonData = {}
jsonData['QDM'] = False
jsonData['Launch'] = False
jsonData['Abort'] = False

radio = Radio(True)
radio.send(json.dumps(jsonData), True)

