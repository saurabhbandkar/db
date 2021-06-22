const moment = require('moment');

const logger = function (request, response, next) {
    console.log(`${request.protocol}://${request.get('host')}: ${request.originalUrl}${moment().format()}`);
    next();
};

module.exports = logger;