const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const helmet = require("helmet");

const { contextMiddleware } = require('./helpers/logger');

const { notFound } = require('./middlewares/notFound');
const { errorHandler } = require('./middlewares/errorHandler');

const account = require('./routes/account');
const artform = require('./routes/artform');
const organization = require('./routes/organization');
const artist = require('./routes/artist');
const nft = require('./routes/nft');
const file = require('./routes/file');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(compression());
app.use(helmet());
app.use(cookieParser());
app.use(contextMiddleware);

app.use('/admin/account', account);
app.use('/admin/artform', artform);
app.use('/admin/organization', organization);
app.use('/admin/artist', artist);
app.use('/admin/nft', nft );
app.use('/admin/file', file );

app.use( notFound );
app.use( errorHandler );

module.exports = app;