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
            function HomeController($scope, $location, authentication, identity){
                $scope.hasLoggedUser = identity.hasLoggedUser();

                $scope.login = function(user){
                    authentication.loginUser(user)
                        .then(function(loggedInUser){
                            sessionStorage['authToken'] = loggedInUser.access_token;
                            console.log(loggedInUser);
                            $location.path('/asd');
                        },
                        function(err){
                            console.log(err);
                        });
                };

                $scope.register = function (user) {
                    authentication.registerUser(user)
                        .then(function(registeredUser) {
                            $scope.login({username: user.email, password: user.password});
                            console.log(registeredUser);
                        },
                        function(err){
                            console.log(err);
                        });
                };

                $scope.logout = function(){
                    authentication.logout()
                        .then(function(){
                            sessionStorage.clear();
                            console.log("suecces logout!");
                        },
                        function(err){
                            console.log(err);
                        });
                }
            }]);
}());