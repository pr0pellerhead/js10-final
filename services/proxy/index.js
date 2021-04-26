const config = require('../../config/index');
const express = require('express');
const proxy = require('express-http-proxy');

const app = express();

app.use('/api/v1/auth', proxy(
    `http://localhost:${config.get('ports').auth}`,
    { 
        proxyReqPathResolver: (req) => {
            return `http://localhost:${config.get('ports').auth}/api/v1/auth${req.url}`
        }
    }
));

app.use('/api/v1/users', proxy(
    `http://localhost:${config.get('ports').users}`,
    {
        proxyReqPathResolver: (req) => {
            return `http://localhost:${config.get('ports').users}/api/v1/users${req.url}`
        }
    }
));

app.use('/api/v1/storage', proxy(
    `http://localhost:${config.get('ports').storage}`,
    {
        proxyReqPathResolver: (req) => {
            return `http://localhost:${config.get('ports').storage}/api/v1/storage${req.url}`
        }
    }
));

app.use('/', express.static(`${__dirname}/../../public/build`));

const PORT = process.env.PORT || config.get('ports').proxy;

app.listen(PORT, err => {
    if(err) {
        return console.log('Could not start proxy service', err);
    }
    console.log('Proxy service successfully started');
});