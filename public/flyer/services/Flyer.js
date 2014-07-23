'use strict';

angular.module('flyService.flyer').factory('Flyer', ['$resource', function($resource) {
    return $resource('/api/flyers/:flyerGroupId', {
            flyerGroupId: '@groupID'
        }
    );
}]);