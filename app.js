/**
 *  Include dependencies
 *  express - import express and initialize express function (createApplication)
 *  config - import config with secrets
 *  Database - import Database module
 *  Scrapper - import Scrapper module
 */
import express from 'express';
import config from './config/secrets.json';
import Database from './libs/database';
import Scraper from './libs/scraper';
import logger from 'morgan';
import bodyParser from 'body-parser';
import Routes from './app/routes';

/**
 *  Init Expressjs app
 */
const app = express();

/**
 *  Config application application
 *
 *  env - App environment
 *  port - App port
 *  cron - Config cron schedule, if there is no config const, run cron in every minute
 */
const env = process.env.ENV || 'development';
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
