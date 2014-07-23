'use strict';

module.exports = {
    db: 'mongodb://localhost/flyService',
    app: {
        name: 'flyJoin - 나는 것에 합류'
    },
    github: {
        clientID: '2ebddd6db2a57da7a20f',
        clientSecret: '0ac16afb9577f08ce04f5e30d29c6b821747754c',
        callbackURL: 'http://localhost:3000/auth/github/callback'
    },
    flyJenkinsCoreAPI: {
        serviceGroupList: {
            url: 'http://core.flyjenkins.org/jenkins/plugin/flyJenkins/serviceGroupList',
            method: 'GET',
            params: {
                page: 1,
                limit: 5
            }
        },
        createServiceGroup: {
            url: 'http://core.flyJenkins.org/jenkins/plugin/flyJenkins/saveServiceGroup',
            method: 'POST'
        },
        serviceList: {
            url: 'http://core.flyjenkins.org/jenkins/plugin/flyJenkins/serviceList',
            method: 'GET',
            params: {
                page: 1,
                limit: 5
            }
        }
    }
};
