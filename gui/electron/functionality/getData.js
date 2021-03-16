class getData {
    static instance = null
    currData = {};

    constructor(props) {
        super(props);
        this.state = { // Begin state
            isTestMode: false,
            currData: { // Begin currData
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
            }, // End currData
        }; // End state
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

    static getInstance() {
        if (this.instance == null) {
            getData.instance = new getData();
        } else {
            return getData.instance;
        }
    }
}

export default getData;
