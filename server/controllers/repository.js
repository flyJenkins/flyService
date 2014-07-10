'use strict';

var request = require('request'),
    async = require('async'),
    _ = require('lodash'),
    mongoose = require('mongoose'),
    Repository = mongoose.model('Repository'),
    repositoryUtil = require('../utils/repositoryUtil');

exports.syncFromGithub = function(req, res){
    if(req.isAuthenticated()){
        var user = req.user;
        if(user && user.github && user.github.repos_url){
            var requestOption = {
                uri : user.github.repos_url,
                headers : {
                    'User-Agent' : 'request'
                }
            };
            // github에서 repository 목록을 가져옴
            request(requestOption, function(error, response, body){
                if(error){
                    res.send(500, error);
                }else{
                    body = JSON.parse(body);

                    // 이미 저장된 repository 목록을 가져옴
                    Repository
                        .find({ owner: user._id })
                        .exec(function(err, repositories){
                            if(err){
                                res.send(500, err);
                            }else{
                                var syncCompleteCount = 0,
                                    receiveRepository,
                                    i;

                                var repositorySaveFunction = function(repository){
                                    // 기존에 저장했던 repository면 업데이트만...
                                    var alreadySavedRepository = _.find(repositories, function(repository){
                                        return repository.name === receiveRepository.name;
                                    });

                                    if(alreadySavedRepository){
                                        repository = alreadySavedRepository;
                                        repository.github = receiveRepository;
                                    }else{
                                        repository = new Repository({
                                            name: receiveRepository.name,
                                            type: receiveRepository.fork ? 'fork' : 'own',
                                            ogirinRepositoryType: 'github',
                                            originRepositoryURL: receiveRepository.git_url,
                                            owner: user._id
                                        });
                                    }
                                    repository.syncDate = new Date();

                                    // repository sync 개시
                                    repositoryUtil.analysis({
                                        userId: user.username,
                                        repositoryName: repository.name,
                                        callback: function(err, data){
                                            repository.analysis = data;
                                            repository.save(function(err){
                                                if(err){
                                                    console.log(err);
                                                }
                                                console.log(repository._id + ' repository save.');
                                                syncCompleteCount = syncCompleteCount + 1;
                                                if(syncCompleteCount === body.length){
                                                    req.repositories = repositories;
                                                    user.lastSyncDate = new Date();
                                                    user.save(function(err){
                                                        if(err){
                                                            res.send(500, err);
                                                        }else{
                                                            res.json(repositories);
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });

                                };
                                for(i = 0; i < body.length; i++){
                                    receiveRepository = body[i];
                                    repositorySaveFunction(receiveRepository);
                                }
                            }
                        });
                }
            });
        }
    }else{
        res.status(401).send('error');
    }
};
exports.getGIthubRepository = function(req, res){
    var user = req.user;
    var requestOption = {
        uri : user.github.repos_url,
        headers : {
            'User-Agent' : 'request'
        }
    };

    request(requestOption, function(error, repsponse, body){
        if(error){
            res.json(500, error);
        }else{
            res.json(JSON.parse(body));
        }
    });

};

exports.repository = function(req, res){
    var user = req.user;
    // login check
    if(req.isAuthenticated()){
        if(req.repositories){
            res.json(req.repositories);
        }else{
            Repository
                .find({
                    owner: user._id
                })
                .exec(function(err, repositories){
                    if(err){
                        res.send(500, err);
                    }else{
                        req.repositories = repositories;
                        res.json(repositories);
                    }
                });
        }
    }else{
        res.status(403).send('login plz.');
    }
};

exports.syncAll = function(req, res){
    var user = req.user,
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