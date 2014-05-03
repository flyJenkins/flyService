var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('./autoIncrementInit');


var TestSchema = new Schema({
    jobID : Number,
    gitUrl : String,
    description : String,
    testReports : [
        {
            buildNumber : Number,
            createDate : Date,
            result : String,
            testCode : {
                count : Number,
                passing : Number,
                fail : Number
            },
            changeFile : {
                add : [{
                    type : String
                }],
                modify : [{
                    type : String
                }],
                remove : [{
                    type : String
                }]
            },
            error : {
                mesasge : String,
                reason : String
            }
        }
    ]
});


TestSchema.plugin(autoIncrement.plugin, 'Test');
mongoose.model('Test', TestSchema);