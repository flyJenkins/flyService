'use strict';

angular.module('flyService.tests').factory('Tests', ['$resource', function($resource) {
    return $resource('tests/:jobID', {
        jobID: '@_id'
    });
}]);