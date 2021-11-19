const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '/.env') });

require('./src/mongodb/mongoose');

const { connection } = require('mongoose');

const app = require('./src/app');

const http = require('http');

connection.once('open', () => {
    
    console.log('\x1b[36m%s\x1b[0m', "Database connected successfully");
    
    http.createServer(app).listen(process.env.PORT, () => {
        console.log(`Administrator server is running on port ${process.env.PORT}`);
    });

});