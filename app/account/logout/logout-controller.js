'use strict';

angular.module('issueTrackingSystem.account.logout', [])
    .controller('LogoutController', [
        '$scope',
        'authentication',
        'notyService',
        function LogoutController($scope, authentication, notyService) {
            $scope.logout = function(){
                authentication.logout()
                    .then(
                        function success(){
                            sessionStorage.clear();
                            notyService.showSuccess('Logout successfull!');
                        },
                        function(err){
                            notyService.showError('Logout failed!');
                        });
            };
        }]);
