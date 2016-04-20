'use strict';

angular.module('issueTrackingSystem.account.users.allUsersController',
    ['issueTrackingSystem.account.users.allUsersService'])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/profile/password', {
            templateUrl: 'app/account/allUsers/all-users-template.html',
            controller: 'AllUsersController'
        })
    }])
    .controller('AllUsersController', [
        '$scope',
        'allUsersService',
        'notyService',
        'identity',
        function AllUsersController($scope, allUsersService, notyService, identity){

            $scope.isAdmin = function(){
                return identity.isAdmin();
            };

            $scope.allUsers = function(){
                allUsersService.getAllUsers()
                    .then(
                        function success(data){
                            $scope.users = data.data;
                        },
                        function error(err){
                            console.log(err);
                        }
                    );
            };
        }]);
