'use strict';

var flyerGroups = require('../controllers/flyerGroups');
var flyer = require('../controllers/flyer');
module.exports = function(app) {
    app.get('/api/flyer-groups', flyerGroups.find);
    app.get('/api/flyers/:flyerGroupId', flyer.findByGroupId);
};