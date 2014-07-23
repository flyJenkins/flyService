'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('./autoIncrementInit');


var FlyerGroupSchema = new Schema({
    groupId: {
        type: Number,
        unique: true
    },
    user:{
        type: Schema.ObjectId,
        ref: 'User'
    }
});


FlyerGroupSchema.plugin(autoIncrement.plugin, 'FlyerGroup');
mongoose.model('FlyerGroup', FlyerGroupSchema);