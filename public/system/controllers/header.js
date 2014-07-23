'use strict';

angular.module('flyService.system').controller('HeaderController', ['$scope', '$rootScope', 'Global', 'Menus',
    function($scope, $rootScope, Global, Menus) {
        $scope.global = Global;
        $scope.menus = {};

        // Default hard coded menu items for main menu
        var defaultMainMenu = [
            {
                roles : ['authenticated'],
                title: 'Flyer 관리',
                link : 'all flyer groups'
            },
            {
                roles : ['authenticated'],
                title : '테스트 대시보드',
                link : 'all tests'
            },
            {
                roles : ['authenticated'],
                title : '배포 대시보드',
                link : 'all deploy reports'
            }
        ];

        // Query menus added by modules. Only returns menus that user is allowed to see.
        function queryMenu(name, defaultMenu) {

            Menus.query({
                name: name,
                defaultMenu: defaultMenu
            }, function(menu) {
                $scope.menus[name] = menu;
            });
        };

        // Query server for menus and check permissions
        queryMenu('main', defaultMainMenu);

        $scope.isCollapsed = false;

        $rootScope.$on('loggedin', function() {

            queryMenu('main', defaultMainMenu);

            $scope.global = {
                authenticated: !! $rootScope.user,
                user: $rootScope.user
            };
        });

    }
]);