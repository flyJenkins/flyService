'use strict';

// User routes use users controller
var users = require('../controllers/users');
var repository = require('../controllers/repository');
module.exports = function(app, passport) {

    app.get('/logout', users.signout);
    app.get('/users/me', users.me);

    // Setting up the userId param
    app.param('userId', users.user);

    // AngularJS route to check for authentication
    app.get('/loggedin', function(req, res) {
        res.send(req.isAuthenticated() ? req.user.name : '0');
    });

    // Setting the local strategy route
    app.post('/login', passport.authenticate('local', {
        failureFlash: true
    }), function (req,res) {
        res.send(req.user.name);
    });

    // Setting the github oauth routes
    app.get('/auth/github', passport.authenticate('github', {
        failureRedirect: '#!/login'
    }), users.signin);

    app.get('/auth/github/callback', passport.authenticate('github', {
        failureRedirect: '#!/login'
    }), users.authCallback);


    app.get('/user/repository', repository.repository);

};
