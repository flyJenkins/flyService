'use strict';
var request = require('request');

var ANALYSIS_URL = 'http://github.flyjenkins.org/repos/{owner}/{repo}/git/analysis';
exports.analysis = function(params){
    var requestUrl = ANALYSIS_URL.replace(/{owner}/, params.userId).replace(/{repo}/, params.repositoryName);

    request(requestUrl, function(err, res, data){
        params.callback(err, data);
    });
};