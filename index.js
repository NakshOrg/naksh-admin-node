const dotenv = require('dotenv');

dotenv.config();

require('./src/mongodb/mongoose');

const app = require('./src/app');

const http = require('http');

const httpServer = http.createServer(app);

httpServer.listen(process.env.PORT, () => {
    console.log(`Administrator server is running on port ${process.env.PORT}`);
});