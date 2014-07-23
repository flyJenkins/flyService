'use strict';

exports.load = function(env){
    if(env === undefined){
        env = process.env.NODE_ENV;
    }

    if(env === 'development'){
        return require('../config/env/development');
    }else{
        return require('../config/env/production');
    }
};