require('../../db');
const express = require('express');
const api = express();
const router = require('./router');
const jwt = require('express-jwt');
const config = require('../../config');

api.use(express.json());

api.use(jwt({ 
  secret: config.get('auth').jwt_key, 
  algorithms: ['HS256'] 
}).unless({
  path: [
    '/api/v1/auth/register',
    '/api/v1/auth/login'
  ]
}));

api.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({
      error: true,
      message: 'You need to log in in order to perform this action'
    });
  }
});

api.use('/api/v1/auth', router);

api.listen(config.get('ports').auth, err => {
  if (err) {
    return console.log('Error happened while starting the auth service: ', err);
  }
  console.log('Auth service successfully started on port', config.get('ports').auth);
});
