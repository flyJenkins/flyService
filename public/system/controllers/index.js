'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', '$http', 'Global', function ($scope, $http, Global) {
    $scope.global = Global;

    $scope.getRepositoryList = function(callback){
        $http.get("/user/repository")
            .success(function(data){
                callback(data);
            }
        );
    };

    $scope.getRepositoryList(function(data){
        $scope.repositoryList = data;
    })
}]);