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
        'homeService',
        function HomeController($scope, $location, authentication, identity, notyService, homeService){
            $scope.hasLoggedUser = identity.hasLoggedUser;

            $scope.isAdmin = identity.isAdmin;

            $scope.issuesParams = {
                pageSize: 10,
                pageNumber: 1
            };

            $scope.projectsParams = {
                pageSize: 7,
                pageNumber: 1
            };

            $scope.getUserIssues = function(){
                homeService.getUserIssues($scope.issuesParams)
                    .then(function success(data){
                        $scope.userIssues = data.Issues;
                        $scope.showIssuesPagination = data.TotalPages > 1;
                        $scope.issuesCount = data.TotalPages * $scope.issuesParams.pageSize;
                    }, function error(err){
                        notyService.showError('Cannot load issus at the moment!');
                    })
            };

            $scope.getAssociatedProjects  = function(){
                homeService.getUserProjectsWhereIsLead($scope.projectsParams)
                    .then(function success(data){
                        $scope.projectsWhereLead = data.Projects;
                        $scope.showProjectsPagination  = data.TotalPages > 1;
                        $scope.projectsCount  = data.TotalPages * $scope.projectsParams.pageSize;
                    }, function error(err){
                        notyService.showError('Cannot load projects at the moment!');
                    })
            };



            $scope.login = function(user){
                authentication.loginUser(user)
                    .then(function(loggedInUser){
                        sessionStorage['authToken'] = loggedInUser.access_token;
                        $scope.getUserIssues();
                        notyService.showSuccess('Login successful!');
                        identity.getCurrentUser()
                            .then(
                                function(data){
                                    sessionStorage['currentUser'] = JSON.stringify(data)
                                    $scope.getAssociatedProjects();
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

            if($scope.hasLoggedUser()){
                $scope.getUserIssues();
                $scope.getAssociatedProjects();
            }
        }]);