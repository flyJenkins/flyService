'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    _ = require('lodash'),
    autoIncrement = require('./autoIncrementInit');


var RepositorySchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'ready',
        required: true
    },
    originRepositoryURL: {
        type: String,
        required: true
    },
    originRepositoryType: {
        type: String,
        required: true
    },
    jobID: Number,
    syncDate : Date,
    github: Object,
    analysis: {
        commitSha: String,
        analysisChance: Boolean,
        projectName: String,
        buildType: String,
        projectType: String,
        language: String
    }
});

var repositoryStatus = ['ready', 'testing', 'building'];
RepositorySchema.methods = {
    changeStatus: function(status, callback){
        this.status = 'status';
        this.save = function(err){
            callback(err);
        };
    }
};

// 상태변경 method 생성
_.each(repositoryStatus, function(status){
    RepositorySchema.methods[status] = function(callback){
        this.changeStatus(status, callback);
    };
});

RepositorySchema.plugin(autoIncrement.plugin, 'Repository');
mongoose.model('Repository', RepositorySchema);