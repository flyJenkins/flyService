'use strict';
var repository = require('../controllers/repository');
module.exports = function(app) {
    app.get('/repository', repository.repository);
    app.post('/repository/sync', repository.sync);
};