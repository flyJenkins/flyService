'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    request = require('request');

/**
 * Auth callback
 */
exports.authCallback = function(req, res) {
    res.redirect('/');
};

/**
 * Show login form
 */
exports.signin = function(req, res) {
    if(req.isAuthenticated()) {
        return res.redirect('/');
    }
    res.redirect('#!/login');
};

/**
 * Logout
 */
exports.signout = function(req, res) {
    req.logout();
    res.redirect('/');
};

/**
 * Session
 */
exports.session = function(req, res) {
    res.redirect('/');
};

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

                        for(var repo, i = 0; repo = body[i]; i++){
                            if(repo.fork){
                                repositories.fork.push(repo);
                            }else{
                                repositories.own.push(repo);
                            }
                        }
                        req.repositories = repositories;
                        res.json(repositories);
                    }

                });
            }
        }
    }else{
        res.status(403).send('login plz.');
    }
};
/**
 * Create user
 */
exports.create = function(req, res, next) {
    var user = new User(req.body);

    user.provider = 'local';

    // because we set our user.provider to local our models/user.js validation will always be true
    req.assert('email', 'You must enter a valid email address').isEmail();
    req.assert('password', 'Password must be between 8-20 characters long').len(8, 20);
    req.assert('username', 'Username cannot be more than 20 characters').len(1,20);
    req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);

    var errors = req.validationErrors();
    if (errors) {
        return res.status(400).send(errors);
    }

    // Hard coded for now. Will address this with the user permissions system in v0.3.5
    user.roles = ['authenticated'];
    user.save(function(err) {
        if (err) {
            switch (err.code) {
                case 11000:
                case 11001:
                    res.status(400).send('Username already taken');
                    break;
                default:
                    res.status(400).send('Please fill all the required fields');
            }

            return res.status(400);
        }
        req.logIn(user, function(err) {
            if (err) return next(err);
            return res.redirect('/');
        });
        res.status(200);
    });
};
/**
 * Send User
 */
exports.me = function(req, res) {
    res.jsonp(req.user || null);
};

/**
 * Find user by id
 */
exports.user = function(req, res, next, id) {
    User
        .findOne({
            _id: id
        })
        .exec(function(err, user) {
            if (err) return next(err);
            if (!user) return next(new Error('Failed to load User ' + id));
            req.profile = user;
            next();
        });
};