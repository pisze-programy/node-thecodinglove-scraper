const mongoose = require('mongoose');
const Logger = require('./logger.js');
const database = require('../config/database.json');

const env = process.env.NODE_ENV || 'production';
const db = database[env].main;
const url = `${db.adapter}://${db.user}:${db.password}@${db.host}:${db.port}/${db.database}`;

function connect() {
    const options = { server: { socketOptions: { keepAlive: 1 } } };

    Logger({message: 'Connecting to database [...]'});

    return mongoose.connect(url, options)
        .connection
        .on('error', error)
        .on('disconnected', disconnected)
        .on('connected', connected);
}

function error (err) {
    Logger({message: `Mongoose default connection error: ${err}`});
    exit();
}

function connected () {
    Logger({message: `Mongoose default connection open to: ${url}`});

    /**
     * If the Node process ends, close the Mongoose connection
     */
    process.on('SIGINT', function() {
        Logger({message: 'SIGINT'});

        mongoose.connection.close(() => {
            Logger({message: 'Mongoose default connection disconnected through app termination'});

            exit();
        });
    });
}

function disconnected () {
    Logger({message: 'Mongoose default connection disconnected'});

    exit();
}

function exit () {
    process.exit(0);
}

module.exports = connect;
