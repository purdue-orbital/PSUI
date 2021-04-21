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
            // TODO: Make api calls
            console.log("Reading data from sensors");
        }, 1000);
    }

    __startRandomData() {
        // Currently gets random data. Probably shouldn't send this to production...
        this.loadDataInterval = setInterval(() => {
        const lat2 = Math.random(); 
        const lon2 = Math.random();
        const dist = this.__calcDistance(lat2, lon2);
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
                Distance: dist,
                /*get Distance() {
                	__calcDistance(this.Latitude, this.Longitude);
                },*/
                Altitude: Math.random(),
                Temperature: Math.random(),
                Latitude: lat2,
                Longitude: lon2,
                /*
                                get Bearing() {
                	__calcBearing(this.Latitude, this.Longitude);
               	},
               	*/
            };
        }, 1000);
    }
    
    __calcDistance(lat2, lon2) {
    	// calculates and returns distance in meters from launch site
    	// DEFINE LON1 AND LAT1 to be launch site coordinates
    	const lat1 = 0
    	const lon1 = 0
    	const R = 6371e3; // metres
    	const phi1 = lat1 * Math.PI/180; // φ, λ in radians
			const phi2 = lat2 * Math.PI/180;
			const dPhi = (lat2-lat1) * Math.PI/180;
			const dLambda = (lon2-lon1) * Math.PI/180;
			const a = Math.sin(dPhi/2) * Math.sin(dPhi/2) + Math.cos(phi1) * Math.cos(phi2) * Math.sin(dLambda/2) * Math.sin(dLambda/2);
			const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
			const d = R * c; // in metres
			return d;
    }
    
    __calcBearing(lat2, lon2) {
    	// calculates and returns bearing in degrees
    	// DEFINE LON1 AND LAT1 to be launch site coordinates
    	const lat1 = 0
    	const lon1 = 0
    	lambda1 = lon1 * Math.PI/180;
    	lambda2 = lon2 * Math.PI/180;
    	phi1 = lat1 * Math.PI/180;
    	phi2 = lat2 * Math.PI/180;
    	const y = Math.sin(lambda2-lambda1) * Math.cos(phi2);
    	const x = Math.cos(phi1)*Math.sin(phi2) - Math.sin(phi1)*Math.cos(phi2)*Math.cos(lambda2-lambda1);
    	const theta = Math.atan2(y,x);
    	return (theta*180/Math.PI + 360) % 360;
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

