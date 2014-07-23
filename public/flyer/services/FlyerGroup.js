'use strict';

angular.module('flyService.flyer').factory('FlyerGroup', ['$resource', function($resource) {
    return $resource('/api/flyer-groups/:id', {
            id: '@_id'
        }
    );
}]);