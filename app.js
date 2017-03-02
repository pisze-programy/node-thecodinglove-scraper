/**
 *  Include dependencies
 *  app - import express and initialize express function (createApplication)
 *  mongoose - connect to database using mongoose driver
 */
import express from 'express';
import mongoose from './libs/database.js';

/**
 *  Init Expressjs app
 */
const app = express();

/**
 *  Connect to database by mongoose
 */
mongoose();

/**
 *  Config application environment
 *
 *  config - include secrets
 *  env - App environment
 *  port - App port
 */
const config = require('./config/secrets.json') || console.warn('There is no config file "config/secrets.json"');
const env = process.env.ENV || 'development';
const port = process.env.PORT || config[env].port;

/**
 *  Initialize server with port from env or config file
 */
app.listen(port, () => {
    console.log(`Server is listening at: ${port}`);
});
