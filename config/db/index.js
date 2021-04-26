const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/project', {
  useNewUrlParser: true, useUnifiedTopology: true
}, err => {
  if (err) {
    return console.log('Could not connect to DB: ', err);
  }

  console.log('Successfully connected to database...');
});