'use strict';

//Setting up route
angular.module('flyService.flyer').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider
            .state('all flyer groups', {
                url: '/flyers-groups',
                templateUrl: 'public/flyer/views/index.html'
            })
            .state('flyers by flyerGroupId', {
                url: '/flyers-groups/:flyersGroupId',
                templateUrl: 'public/flyers/views/index.html'
            });
    }
])