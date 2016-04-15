(function(){
    angular.module('issueTrackingSystem.common', [])
        .controller('MainController', [
            '$scope',
            'identity',
            function MainController($scope, identity) {
                $scope.hasLoggedUser = identity.hasLoggedUser;
            }]);
}());