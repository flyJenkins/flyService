'use strict';
var repository = require('../controllers/repository');
module.exports = function(app) {
    app.get('/api/repository', repository.repository);
    app.get('/api/repository/github', repository.getGIthubRepository);
    app.post('/api/repository/sync', repository.syncFromGithub);

    // app.post('/repository/sync/:repositoryName', repository.syncOne);
};