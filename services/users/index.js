const express = require('express');
const api = express();
const router = require('./router');
const jwt = require('express-jwt');
require('../../config/db');

api.use(express.json());

api.use(jwt({ secret: 'secret_key', algorithms: ['HS256'] }));

api.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({
      error: true,
      message: 'You need to log in in order to perform this action'
    });
  }
});

api.use('/api/v1/users', router);

api.listen(3001, err => {
  if (err) {
    return console.log('Error happened while starting the users service: ', err);
  }

  // TODO: Put port number to an env variable
  console.log('Users service successfully started on port 3001...');
});
