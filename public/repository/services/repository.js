'use strict';

angular.module('flyService.repository').factory('Repository', ['$resource', function($resource) {
    return $resource('/api/repository/:id', {
            id: '@_id'
        },
        {
            getGithubRepositories : {
                url: '/api/repository/github',
                method: 'GET',
                isArray: true
            }
        }
    );
}]);