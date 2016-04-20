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
            $scope.hasLoggedUser = identity.hasLoggedUser;

            $scope.isAdmin = identity.isAdmin;

            $scope.login = function(user){
                authentication.loginUser(user)
                    .then(function(loggedInUser){
                        sessionStorage['authToken'] = loggedInUser.access_token;
                        $location.path('/dashboard');
                        notyService.showSuccess('Login successful!');
                        identity.getCurrentUser()
                            .then(
                                function(data){
                                    sessionStorage['currentUser'] = JSON.stringify(data)
                                }, function(err){
                                    console.log(err);
                                })
                    },
                    function(err){
                        notyService.showError('Login failed!');
                    });
            };

            $scope.register = function (user) {
                authentication.registerUser(user)
                    .then(function(registeredUser) {
                        $scope.login({username: user.email, password: user.password});
                        notyService.showSuccess('Register successful!');
                    },
                    function(err){
                        notyService.showError('Register failed!');
                    });
            };
        }]);