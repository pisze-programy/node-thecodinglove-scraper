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
const url = config[env].url;

/**
 * Start application
 *
 * Connect to database
 * Start Scraping
 */
new Database();
new Scraper({cronSchedule, url}).runCron();

/**
 *  Initialize server with port from env or config file
 */
app.listen(port, () => {
    console.log(`Server is listening at: ${port}`);
});
