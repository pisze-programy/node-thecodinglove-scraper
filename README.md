# Node thecodinglove scraper
Node scraping using [Express][https://github.com/expressjs/express]. Application is for learn purpose and for future usage. 
The site which is scraped is [thecodinglove](http://thecodinglove.com).
If you would like to write own scraper, fill free to fork it. 

## Usage
Thecodinglove.com scraping using express.

## Quick start

### 1. Copy a config files and fill it

1.1. Database configuration
```sh
$ cp config/database.example.json config/database.json
```

1.2 Secrets config
```sh
$ cp config/secrets.example.json config/secrets.json
```
Note: Set the cron schedule in every: config/secrets.json key: [cron](https://github.com/ncb000gt/node-cron)
Note2: Remember that first cron job will start immediate but job will be executed after this time.

### 2. Install dependecies
```sh
$ npm install 
```
or
```sh
$ yarn
```

### 3. Run server
```sh
$ npm start
```

### 4. Enjoy thecodinglove scraper.

Remember, it is not cool to DDoS sites. [Thecodinglove.com](http://www.thecodinglove.com) is super cool. Do not run cron job if u do not need it.

## Dependecies

| Plugin | Description |
| ------ | ------ |
| [Express](https://github.com/expressjs/express) | Fast, unopinionated, minimalist web framework for node |
| [Mongoose](https://github.com/Automattic/mongoose) | Mongoose is a [MongoDB](https://www.mongodb.org/) object modeling tool designed to work in an asynchronous environment |
| [Babel](https://github.com/babel/babel) | The compiler for writing next generation JavaScript |
| [Request](https://github.com/request/request) | Simplified HTTP client |
| [ESLint](https://github.com/eslint/eslint) | A fully pluggable tool for identifying and reporting on patterns in JavaScript |
| [Joi](https://github.com/hapijs/joi) | Object schema validation |
| [Body-Parser](https://github.com/expressjs/body-parser) | Node.js body parsing middleware |
| [Cheerio](https://github.com/cheeriojs/cheerio) | Fast, flexible, and lean implementation of core jQuery designed specifically for the server |
| [Nodemon](https://github.com/remy/nodemon) | Monitor for any changes in your node.js application and automatically restart the server - perfect for development |
| [Node-cron](https://github.com/ncb000gt/node-cron) | Cron jobs for your node |

## License
MIT © [Krystian Błaszczyk](https://github.com/Krbz)
