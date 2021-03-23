class DataState {
    static instance = null
    currData = {};

    constructor() {
        this.currData = { // Begin currData
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
    }

    startRandomData() {
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

    getRandomData() {
        return this.currData;
    }

    clearData() {
        clearInterval(this.loadDataInterval);
    }

    getDataFields() {
        return Object.keys(this.currData);
    }

    static getInstance() {
        if (DataState.instance == null) {
            DataState.instance = new DataState();
        }
        return DataState.instance;
    }
}

module.exports = DataState;

