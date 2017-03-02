import mongoose from 'mongoose';
import database from '../config/database.json';

const env = process.env.NODE_ENV || 'development';
const db = database[env].main;
const url = `${db.adapter}://${db.user}:${db.password}@${db.host}:${db.port}/${db.database}`;

function connect() {
    const options = { server: { socketOptions: { keepAlive: 1 } } };

    console.log('Connecting to database...');
    return mongoose.connect(url, options)
        .connection
        .on('error', error)
        .on('disconnected', disconnected)
        .on('connected', connected);
}

function error (err) {
    console.log(`Mongoose default connection error: ${err}`);
}

function connected () {
    console.log(`Mongoose default connection open to: ${url}`);
}

function disconnected () {
    console.log('Mongoose default connection disconnected');
}

/**
 * If the Node process ends, close the Mongoose connection
 */
process.on('SIGINT', function() {
    mongoose.connection.close(() => {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

export default connect;
