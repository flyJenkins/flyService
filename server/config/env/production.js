'use strict';

module.exports = {
    db: 'mongodb://localhost/flyService',
    app: {
        name: 'flyService'
    },
    github: {
        clientID: 'd64bfb89cc502f5461ca',
        clientSecret: '6ad15b8c0e4b01543bf317197767b855d6548097',
        callbackURL: 'http://join.flyjenkins.org/auth/github/callback'
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
