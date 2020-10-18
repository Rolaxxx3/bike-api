module.exports = {
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    MONGODB_URI: getDatabaseUri(),
};


function getDatabaseUri() {
    return process.env.MONGODB_URI ? `mongodb://${process.env.MONGODB_URI}` : 'mongodb://localhost:27017/bike'
}
