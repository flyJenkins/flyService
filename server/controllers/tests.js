'use strict';
var dummyTests = [
    {
        jobID : 1,
        jobName : 'rotobot',
        description : '잉여짓',
        gitUrl : 'git://github.com/rotoshine/rotobot.git',
        testReports : [
            {
                buildNumber : 3,
                createDate : new Date(),
                result : 'success',
                testCode : {
                    count : 100,
                    passing : 100,
                    fail : 0
                },
                changeFile : {
                    add : [],
                    modify : [],
                    remove : []
                },
                error : null
            },
            {
                buildNumber : 2,
                createDate : new Date(),
                result : 'success',
                testCode : {
                    count : 100,
                    passing : 100,
                    fail : 0
                },
                changeFile : {
                    add : [
                        'public/README.md'
                    ],
                    modify : [
                        'package.json'
                    ],
                    remove : [
                        'public/test.txt'
                    ]
                },
                error : null
            },
            {
                buildNumber : 1,
                createDate : new Date(),
                result : 'fail',
                testCode : {
                    count : 100,
                    passing : 0,
                    fail : 0
                },
                changeFile : {

                },
                error : {
                    message : 'compile error',
                    reason : 'init.js not found.'
                }
            }
        ]
    },
    {
        jobID : 2,
        jobName : 'rotoworld',
        description : '잉여짓 파이팅!!!!',
        gitUrl : 'git://github.com/rotoshine/rotoworld.git',
        testReports : [
            {
                buildNumber : 1,
                createDate : new Date(),
                result : 'fail',
                testCode : {
                    count : 100,
                    passing : 0,
                    fail : 0
                },
                changeFile : {

                },
                error : {
                    message : 'compile error',
                    reason : 'init.js not found.'
                }
            }
        ]
    }
];

exports.tests = function(req, res){
    res.json(dummyTests);
};

exports.findOne = function(req, res){
    var hasData = false,
        i,
        jobID = parseInt(req.params.jobID);
    for(i = 0 ; i < dummyTests.length; i++){
        if(dummyTests[i].jobID === jobID){
            hasData = true;
            console.log(dummyTests[key]);
            res.json(dummyTests[key]);
        }
    }
    if(!hasData){
        res.json(null);
    }
};

exports.findByJobIDAndBuildNumber = function(req, res){
    var hasData = false,
        i,
        j,
        jobID = parseInt(req.params.jobID),
        buildNumber = parseInt(req.params.buildNumber);
    for(i = 0 ; i < dummyTests.length; i++){
        if(dummyTests[i].jobID === jobID){
            for(j = 0; j < dummyTests[i].testReports.length;j++){
                if(dummyTests[i].testReports[j].buildNumber === buildNumber){
                    hasData = true;
                    res.json(dummyTests[i].testReports[j]);
                }
            }
        }
    }
    if(!hasData){
        res.json(null);
    }
};