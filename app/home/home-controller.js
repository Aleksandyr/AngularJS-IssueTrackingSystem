(function(){
    'use strict';

    angular.module('issueTrackingSystem.home', [
    ])
        .config(['$routeProvider', function($routeProvider){
            $routeProvider.when('/', {
                templateUrl: 'app/home/home.html',
                controller: 'HomeController'
            });
        }])
        .controller('HomeController', [
            '$scope',
            '$location',
            'authentication',
            'identity',
            'notyService',
            function HomeController($scope, $location, authentication, identity, notyService){
                $scope.hasLoggedUser = identity.hasLoggedUser();

                $scope.login = function(user){
                    authentication.loginUser(user)
                        .then(function(loggedInUser){
                            sessionStorage['authToken'] = loggedInUser.access_token;
                            notyService.showSuccess('Login successfull!');
                            $location.path('/asd');
                        },
                        function(err){
                            notyService.showError('Login failed!');
                        });
                };

                $scope.register = function (user) {
                    authentication.registerUser(user)
                        .then(function(registeredUser) {
                            $scope.login({username: user.email, password: user.password});
                            notyService.showSuccess('Register successfull!');
                        },
                        function(err){
                            notyService.showError('Register failed!');
                        });
                };
            }]);
}());