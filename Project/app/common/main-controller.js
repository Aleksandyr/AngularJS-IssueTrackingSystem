'use strict';

angular.module('issueTrackingSystem.common.mainController', [])
    .controller('MainController', [
        '$scope',
        'identity',
        'mainService',
        'authentication',
        function MainController($scope, identity, mainService, authentication) {
            $scope.hasLoggedUser = identity.hasLoggedUser;

            $scope.isAdmin = identity.isAdmin;

            $scope.allUsers = function(){
                mainService.getAllUsers()
                    .then(
                        function success(data){
                            $scope.users = data.data;
                        },
                        function error(err){
                            console.log(err);
                        }
                    );
            };

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
