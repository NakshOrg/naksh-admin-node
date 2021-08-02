const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
const { contextMiddleware } = require('./helpers/logger');

const wallet = require('./routes/account');

const { notFound } = require('./middlewares/notFound');
const { errorHandler } = require('./middlewares/errorHandler');

app.use('/api/account', wallet);

app.use( notFound );
app.use( errorHandler );

module.exports = app