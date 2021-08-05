const { connect } = require('mongoose');

connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
.catch( err => {
  console.log('\x1b[31m%s\x1b[0m', `Error connecting to database: ${err.message}`);
});