'use strict';

var tests = require('../controllers/tests');
module.exports = function(app){
    app.get('/tests', tests.tests);
    app.get('/tests/:jobID', tests.findOne);
    app.get('/tests/:jobID/:buildNumber', tests.findByJobIDAndBuildNumber);
};