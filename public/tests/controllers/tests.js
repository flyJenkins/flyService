'use strict';

angular.module('flyService.tests')
    .controller('TestsController', ['$scope', '$stateParams', '$location', 'Global', 'Tests',
        function ($scope, $stateParams, $location, Global, Tests) {
            $scope.global = Global;

            $scope.selectedTest = null;
            $scope.init = function(){
                Tests.query(function(tests){
                    $scope.tests = tests;
                });
            };
            $scope.selectTest = function(test){
                $scope.selectedTest = test;
            };

}]);