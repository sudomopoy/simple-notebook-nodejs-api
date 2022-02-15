var config = require('../src/config')
var mongoose = require('mongoose');

const database = async () => {
    return mongoose.connect(config.mongoDatabase.connectionString
        , {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );
}

module.exports = database;