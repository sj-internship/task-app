const express = require('express');
require('dotenv').config({ path: __dirname + '/.env' })
const { config } = require('./config');
const mongo = require('./db/mongo');
const bodyParser = require('body-parser')
const app = express();
const handleError = require('./middlewares/errorHandler')

mongo.connect()
    .then(() => {
        app.use(bodyParser.json());
        app.use(handleError);
        app.use(require('./router'));
        app.listen(config.db.PORT, () => {
            console.log(`Task-app listening on port ${config.db.PORT}!`);
        }
        );
    })
    .catch(err => {
        console.log('Database connection error');
        console.log(err);
    });
