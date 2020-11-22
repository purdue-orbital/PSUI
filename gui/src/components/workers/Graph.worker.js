import * as Comlink from 'comlink';

const api = {
  updateChart(dataPoints, dataPoint) {
    dataPoints.shift();
    dataPoints.push({
      "x": Date.now(),
      "y": dataPoint
    });
  }
}

Comlink.expose(api)