'use strict';

//Setting up route
angular.module('flyService.tests').config(['$stateProvider',
    function($stateProvider) {


        $stateProvider
            .state('all tests', {
                url: '/tests',
                templateUrl: 'public/tests/views/index.html'
            })
            .state('test by id', {
                url: '/tests/:testId',
                templateUrl: 'public/tests/views/index.html'
            });
    }
])