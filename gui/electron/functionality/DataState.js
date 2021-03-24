class DataState {
    static instance = null
    currData = {};
    isTestData = false;

    static defualtData = { // Begin currData
        Altitude: 0,
        Longitude: 0,
        Latitude: 0,
        Gyro: { // Begin Gyro
            X: 0,
            Y: 0,
            Z: 0,
        }, // End Gyro
        Temperature: 0,
        Acceleration: { // Begin Acceleration
            X: 0,
            Y: 0,
            Z: 0,
        }, // End Acceleration
    }; // End currData

    constructor() {
        this.currData = DataState.defualtData;
    }

    __startReadingData() {
        this.loadDataInterval = setInterval(() => {
            // TODO: Make api calls
            console.log("Reading data from sensors");
        }, 1000);
    }

    __startRandomData() {
        // Currently gets random data. Probably shouldn't send this to production...
        this.loadDataInterval = setInterval(() => {
            this.currData = {
                Altitude: Math.random(),
                Longitude: Math.random(),
                Latitude: Math.random(),
                Gyro: { // Begin Gyro
                    X: Math.random(),
                    Y: Math.random(),
                    Z: Math.random(),
                }, // End Gyro
                Temperature: Math.random(),
                Acceleration: { // Begin Acceleration
                    X: Math.random(),
                    Y: Math.random(),
                    Z: Math.random(),
                }, // End Acceleration
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
        this.currData = DataState.defualtData;
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

