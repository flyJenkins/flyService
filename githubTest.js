var request = require('request');


request('https://github.com/itwise/HRMS.git', function(err, res, result){
    console.log(res.statusCode);
});