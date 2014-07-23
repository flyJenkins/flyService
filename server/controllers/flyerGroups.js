'use strict';
var request = require('request'),
    mongoose = require('mongoose'),
    async = require('async'),
    FlyerGroup = mongoose.model('FlyerGroup');
var flyJenkinsCoreAPI = require('../utils/configLoader').load().flyJenkinsCoreAPI;


exports.find = function(req, res){
    request(flyJenkinsCoreAPI.serviceGroupList, function(err, remoteRes, body){
        res.json(JSON.parse(body).itemList);
    });
};

exports.create = function(req, res){
    var flyerGroup = new FlyerGroup({
        groupName: req.body.groupName,
        user: req.user._id
    });

    async
        .waterfall([
            function(next){
                request(flyJenkinsCoreAPI.createServiceGroup, function(err, res, body){
                    var result = JSON.parse(body);
                    if(err){
                        next(err);
                    }else if(result.status === 'ok'){
                        next(null);
                    }
                });
            },
            function(next){
                flyerGroup.save(function(err){
                    next(err, flyerGroup);
                });
            }
        ], function(err, flyerGroup){
            if(err){
                res.send(500, err);
            }else{
                res.json(flyerGroup);
            }
        });
};