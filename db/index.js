const mongoose = require('mongoose');
const config = require('../config/index');

const host = config.get('database').host;
const port = config.get('database').port;
const username = config.get('database').username;
const password = config.get('database').password;
const dbname = config.get('database').dbname;

let DSN = `mongodb+srv://${username}:${password}@${host}/${dbname}?retryWrites=true&w=majority`;

mongoose.connect(
  DSN, 
  {
    useNewUrlParser: true, 
    useUnifiedTopology: true
  }, err => {
    if (err) {
      return console.log('Could not connect to DB: ', err);
    }
  console.log('Successfully connected to database...');
});