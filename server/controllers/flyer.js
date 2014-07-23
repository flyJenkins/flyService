'use strict';
var request = require('request');
var _ = require('lodash');
var flyJenkinsCoreAPI = require('../utils/configLoader').load().flyJenkinsCoreAPI;
exports.findByGroupId = function(req, res){
    var flyerGroupId = req.params.flyerGroupId;
    request(flyJenkinsCoreAPI.serviceList.url + '?groupID=' + flyerGroupId, function(err, remoteRes, body){
        var results = JSON.parse(body).itemList;
        var filteredResults = [];
        _.each(results, function(result){
            if(result.groupID === parseInt(flyerGroupId, 10)){
                filteredResults.push(result);
            }
        });
        res.json(filteredResults);
    });
};