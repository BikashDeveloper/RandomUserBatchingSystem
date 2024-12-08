require('dotenv').config();

module.exports = {
    server: {
        port: process.env.PORT || 3000,
    },
    database: {
        uri: process.env.MONGODB_URI || "mongodb://localhost:27017/randomuserdb",
    },
    api: {
        url: process.env.API_URL || "https://randomuser.me/api/",
        params: { results: parseInt(process.env.API_RESULTS) || 100 },
    },
    batch: {
        size: parseInt(process.env.BATCH_SIZE) || 300,
        requestsPerSecond: parseInt(process.env.REQUESTS_PER_SECOND) || 5,
        sleepTime: parseInt(process.env.SLEEP_TIME) || 30000,
    },
};
