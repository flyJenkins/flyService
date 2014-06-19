'use strict';

var request = require('request'),
    async = require('async'),
    repositoryUtil = require('../utils/repositoryUtil');

exports.repository = function(req, res){
    // login check
    if(req.isAuthenticated()){
        if(req.repositories){
            res.json(req.repositories);
        }else{
            var user = req.user;
            if(user && user.github && user.github.repos_url){
                var requestOption = {
                    uri : user.github.repos_url,
                    headers : {
                        'User-Agent' : 'request'
                    }
                };
                request(requestOption, function(error, response, body){
                    if(error){
                        res.send(error);
                    }else{
                        body = JSON.parse(body);
                        // forking한 것과 아닌 것을 나눔
                        var repositories = {
                            fork : [],
                            own : []
                        };
                        var repo, i;
                        for(i = 0; i < body.length; i++){
                            repo = body[i];
                            if(repo.fork){
                                repositories.fork.push(repo);
                            }else{
                                repositories.own.push(repo);
                            }
                        }
                        // 분석 시작
                        user.repositories = repositories;
                        user.save(function(err){
                            if(err){
                                throw err;
                            }else{
                                res.json(repositories);
                            }
                        });
                    }

                });
            }
        }
    }else{
        res.status(403).send('login plz.');
    }
};

exports.sync = function(req, res){
    var user =req.user,
        repositories = user.repositories,
        repository,
        i,
        works = [],
        createAnalysisFunction = function(repository){
            return function(next){
                repositoryUtil.analysis({
                    userId: user.username,
                    repositoryName: repository.name,
                    callback: function(err, data){
                        repository.analysis = data;
                        next(err);
                    }
                });
            };
        };

    console.log(user._id + ' sync start');
    console.log('fork repository count : ' + repositories.fork.length);
    console.log('own repository count : ' + repositories.own.length);
    for(i = 0; i < repositories.fork.length;i++){
        repository = repositories.fork[i];
        works.push(createAnalysisFunction(repository));
    }
    for(i = 0; i < repositories.own.length;i++){
        repository = repositories.own[i];
        works.push(createAnalysisFunction(repository));
    }
    console.log('workCount : ' + works.length);
    async.parallel(works, function(err){
        if(err){
            throw err;
        }else{
            user.save(function(err){
                if(err){
                    throw err;
                }else{
                    res.json(repositories);
                }
            });
        }
    });

};