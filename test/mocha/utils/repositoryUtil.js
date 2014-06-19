'use strict';
var repositoryUtil = require('../../../server/utils/repositoryUtil');
describe('<Unit Test>', function() {
    describe('Utils:', function() {
        describe('repositoyUtil', function() {
            it('anaysis test', function(done) {
                repositoryUtil.analysis({
                    userId:'rotoshine',
                    repositoryName: 'rotochat',
                    callback:function(err, result){
                        console.log(err, result);
                        done();
                    }
                });
            });
        });
    });
});
