const secrets = require('../config/secrets.json');
const fs = require('fs');

const env = process.env.NODE_ENV || 'production';
const debug = secrets[env].debug;
const console_debug = debug.console;
const file_debug = debug.file;
const file_name = debug.filename;

function Logger ({message}) {
    if (file_debug) {
        const logger = fs.createWriteStream(__dirname + `/../public/${file_name}`, {
            flags: 'a'
        });

        logger.write(`[${new Date()}]: Env: ${env}, Message: ${message}\n`);
    }

    if (console_debug) {
        console.log(`[${new Date()}]: Env: ${env}, Message: ${message}`)
    }
}

module.exports = Logger;
