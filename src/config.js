var mg = "mongodb://localhost:27017/notehat?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";

const getAppMode = () => {
    return process.env.MODE;
}
const getVersion = () => {
    return process.env.API_VERSION ? process.env.API_VERSION : "v1";
}
const getAccessKey = () => {
    return process.env.ACCESS_TOKEN;
}
const mongoDatabase = {
    connectionString: process.env.MONGO_CONNECTION ?
        process.env.MONGO_CONNECTION
        : mg
    ,
}
const redisDatabase = {
    connectionString: process.env.REDIS_CONNECTION,
}
module.exports = {
    getAppMode: getAppMode,
    mongoDatabase: mongoDatabase,
    redisDatabase: redisDatabase,
    getVersion: getVersion,
    getAccessKey: getAccessKey,
};