'use strict';

angular.module('flyService.system').controller('IndexController', ['$scope', '$http', 'Global', function ($scope, $http, Global) {
    $scope.global = Global;
    $scope.nowLoading = false;
    $scope.getRepositories = function(callback){
        $scope.nowLoading = true;
        $http.get("/user/repository")
            .success(function(data){
                $scope.nowLoading = false;
                callback(data);
            }
        );
    };

    $scope.sync = function(){
        $http
            .post('/repository/sync')
            .success(function(data){
                console.log(data);
                $scope.lastSyncTime = new Date();
                $scope.repositories = data;
            });
    };
    if(Global.user !== null){
        $scope.getRepositories(function(data){
            $scope.repositories = data;
        })
    }
}]);