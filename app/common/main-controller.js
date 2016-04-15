(function(){
    'use strict';

    angular.module('issueTrackingSystem.common.mainController', [])
        .controller('MainController', [
            '$scope',
            'identity',
            function MainController($scope, identity) {
                $scope.hasLoggedUser = identity.hasLoggedUser;
            }]);
}());