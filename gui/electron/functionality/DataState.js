const fetch = require('node-fetch');

class DataState {
    static instance = null
    currData = {};
    isTestData = false;

    static defaultData = { // Begin currData
        Acceleration: { // Begin Acceleration
            X: 0,
            Y: 0,
            Z: 0,
        }, // End Acceleration
        Gyro: { // Begin Gyro
            X: 0,
            Y: 0,
            Z: 0,
        }, // End Gyro
        Distance: 0,
        Altitude: 0,
        Temperature: 0,
        Latitude: 0,
        Longitude: 0,
    }; // End currData

    constructor() {
        this.currData = DataState.defaultData;
    }

    __startReadingData() {
        this.loadDataInterval = setInterval(() => {
            fetch("http://localhost:5002/rec")
                .then(res => res.json())
                .then(data => {
                    // TODO: Make sure shape of data is same as expected
                    this.currData = {
                        ...this.currData,
                        ...data
                    }
                    console.log(this.currData);
                })
                .catch(e => console.error(e));
        }, 1000);
    }

    __startRandomData() {
        // Currently gets random data. Probably shouldn't send this to production...
        this.loadDataInterval = setInterval(() => {
            this.currData = {
                Acceleration: { // Begin Acceleration
                    X: Math.random(),
                    Y: Math.random(),
                    Z: Math.random(),
                }, // End Acceleration
                Gyro: { // Begin Gyro
                    X: Math.random(),
                    Y: Math.random(),
                    Z: Math.random(),
                }, // End Gyro
                Distance: Math.random(),
                Altitude: Math.random(),
                Temperature: Math.random(),
                Latitude: Math.random(),
                Longitude: Math.random(),
            };
        }, 1000);
    }

    getCurrData() {
        return this.currData;
    }

    clearData() {
        clearInterval(this.loadDataInterval);
    }
    
    getDataFields() {
        return Object.keys(this.currData);
    }

    setTestMode(to = true) {
        this.isTestData = to;
        this.currData = DataState.defaultData;
        clearInterval(this.loadDataInterval);
        if (to) {
            this.__startRandomData();
        } else {
            this.__startReadingData();
        }
    }

    toggleTestMode() {
        this.setTestMode(!this.isTestData);
    }

    isTestMode() {
        return this.isTestData;
    }

    static getInstance() {
        if (DataState.instance == null) {
            DataState.instance = new DataState();
        }
        return DataState.instance;
    }
}

module.exports = DataState;

