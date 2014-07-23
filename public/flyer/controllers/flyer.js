'use strict';

angular.module('flyService.flyer').controller('FlyerController', function($scope, Flyer, FlyerGroup){
    $scope.flyerGroups = null;
    $scope.flyers = null;
    FlyerGroup
        .query(function(flyerGroups){
            $scope.flyerGroups = flyerGroups;
        });


    $scope.selectFlyerGroup = function(flyerGroup){
        Flyer
            .query({
                flyerGroupId: flyerGroup.groupID
            }, function(flyers){
                $scope.flyers = flyers;
            });
    };

    $scope.flyerGroupAddPopup = {
        status: 'hide',
        show: function(){
            this.status = 'show';
        },
        hide: function(){
            this.status = 'hide';
        },
        isShow: function(){
            return this.status === 'show';
        }
    };
    $scope.flyerAddPopup = {
        status: 'hide',
        show: function(){
            this.status = 'show';
        },
        hide: function(){
            this.status = 'hide';
        },
        isShow: function(){
            return this.status === 'show';
        }
    };

    $scope.addFlyerGroup = function(){
        var flyerGroup = new FlyerGroup({
            groupName: $scope.flyerGroup
        })
    };
});