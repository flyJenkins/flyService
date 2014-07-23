'use strict';

angular.module('flyService.tests')
    .controller('TestsController', ['$scope', '$stateParams', '$location', 'Global', 'Tests',
        function ($scope, $stateParams, $location, Global, Tests) {
            $scope.global = Global;

            $scope.selectedTest = null;
            $scope.init = function(){
                Tests.query(function(tests){
                    $scope.tests = tests;

                    if($stateParams.hasOwnProperty('testId')){
                        for(var i = 0; i < $scope.tests.length; i++){
                            if($scope.tests[i]._id === $stateParams.testId){
                                $scope.selectTest($scope.tests[i]);
                                break;
                            }
                        }
                    }
                });
            };
            $scope.selectTest = function(test){
                $scope.selectedTest = test;
            };

}]);