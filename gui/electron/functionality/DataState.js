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
    }; // End currData

    constructor() {
        this.currData = DataState.defaultData;
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

