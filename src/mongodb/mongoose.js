const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.log(`Error connecting to database\n${err}`);
});

db.once('open', () => {
  console.log("Database connected successfully");
});

module.exports = mongoose;