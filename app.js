/**
 *  Include dependencies
 *  babel-register - For Production usage, compile es6/es7 code
 *  express - require express and initialize express function (createApplication)
 *  config - require config with secrets
 *  Database - require Database module
 *  Scrapper - require Scrapper module
 */
require("babel-register");
const express = require('express');
const config = require('./config/secrets.json');
const Database = require('./libs/database');
const Scraper = require('./libs/scraper');
const logger = require('morgan');
const bodyParser = require('body-parser');
const Routes = require('./app/routes');

/**
 *  Init Expressjs app
 */
const app = express();

console.log(process.env);

/**
 *  Config application application
 *
 *  env - App environment
 *  port - App port
 *  cron - Config cron schedule, if there is no config const, run cron in every minute
 */
const env = process.env.NODE_ENV || 'production';
const port = process.env.PORT || config[env].port;
const cronSchedule = config[env].cron || '* * * * *';
const baseURL = config[env].url;

/**
 * Start application
 *
 * Connect to database
 * Start Scraping
 */
new Database();
new Scraper({cronSchedule, baseURL}).runCron();

/**
 *  Middleware config
 */
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.disable('etag');

app.use(function(err, req, res, next) {
    if(err.status !== 404) {
        return next();
    }

    res.send(err.message);
});

/**
 *  App layer middleware
 */
app.use('/api', Routes);

/**
 *  Initialize server with port from env or config file
 */
app.listen(port, () => {
    console.log(`Server is listening at: ${port}`);
});
