'use strict';

module.exports = {
    db: 'mongodb://winterwolf:dnlsxjdnfvm@ds035747.mongolab.com:35747/fly_service',
    app: {
        name: 'flyJoin - 나는 것에 합류'
    },
    facebook: {
        clientID: 'APP_ID',
        clientSecret: 'APP_SECRET',
        callbackURL: 'http://localhost:3000/auth/facebook/callback'
    },
    twitter: {
        clientID: 'CONSUMER_KEY',
        clientSecret: 'CONSUMER_SECRET',
        callbackURL: 'http://localhost:3000/auth/twitter/callback'
    },
    github: {
        clientID: '93d5dceca9704f06797a',
        clientSecret: '0081038d7d11218f36d0a231933a1e5379fd47da',
        callbackURL: 'http://join.flyjenkins.org/auth/github/callback'
    },
    google: {
        clientID: 'APP_ID',
        clientSecret: 'APP_SECRET',
        callbackURL: 'http://localhost:3000/auth/google/callback'
    },
    linkedin: {
        clientID: 'API_KEY',
        clientSecret: 'SECRET_KEY',
        callbackURL: 'http://localhost:3000/auth/linkedin/callback'
    }
};
