'use strict';

var mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment');

var dbConnectionInfo = require('../config/env/development').db;
if(process.env.NODE_ENV === 'production'){
    dbConnectionInfo = require('../config/env/production').db;
}
var connection = mongoose.createConnection(dbConnectionInfo);

autoIncrement.initialize(connection);

module.exports = autoIncrement;