'use strict';

angular.module('flyService.system').controller('IndexController', ['$scope', '$http', '$timeout', 'Global', 'Repository',
    function ($scope, $http, $timeout,  Global, Repository) {
        var Masonry = window.Masonry;
        $scope.global = Global;
        $scope.nowLoading = false;

        $scope.loadRepository = function(){
            if(Global.user !== null){
                $scope.nowLoading = true;
                Repository
                    .query(function(repositories){
                        $scope.nowLoading = false;
                        $scope.repositories = repositories;
                        $timeout(function(){
                            var container = document.querySelector('#repository-list');

                            $scope.masonry = new Masonry(container, {
                                itemSelector: '.repository-wrapper'
                            });

                            console.log($scope.masonry);
                        }, 0);
                    });
            }
        };

        // TODO Popup 객체를 만들어서 중복을 없애자.
        var repositoryAddPopup = {
            addType: null,
            status: 'hide',
            show: function(){
                this.status = 'show';
            },
            hide: function(){
                this.addType = null;
                this.status = 'hide';
            },
            isShow: function(){
                return this.status === 'show';
            },
            selectAddType: function(addType){
                this.addType = addType;
                if(addType !== 'manual'){
                    Repository
                        .getGithubRepositories(function(githubRepositories){
                            // 현재 사용자의 repository 목록 중 이미 github에서 가져온 게 있다면 체크..
                            for(var i = 0; i < $scope.repositories.length; i++){
                                var alreadyAddRepository = $scope.repositories[i];
                                for(var k = 0; k < githubRepositories.length; k++){
                                    var githubRepository = githubRepositories[k];
                                    if(alreadyAddRepository.originRepositoryType === 'github' &&
                                        alreadyAddRepository.name === githubRepository.name){
                                        githubRepositories.isAlreadyAdd = true;
                                        break;
                                    }
                                }
                            }
                        });
                }
            }
        };

        $scope.repositoryAddPopup = repositoryAddPopup;

}]);