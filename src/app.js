const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const helmet = require("helmet");

const { contextMiddleware } = require('./helpers/logger');

const { notFound } = require('./middlewares/notFound');
const { errorHandler } = require('./middlewares/errorHandler');

const wallet = require('./routes/account');
const artform = require('./routes/artform');
const organization = require('./routes/organization');
const artist = require('./routes/artist');
const file = require('./routes/file');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(compression());
app.use(helmet());
app.use(cookieParser());
app.use(contextMiddleware);

app.use('/api/account', wallet);
app.use('/api/artform', artform);
app.use('/api/organization', organization);
app.use('/api/artist', artist);
app.use('/api/file', file );

app.use( notFound );
app.use( errorHandler );

module.exports = app;