'use strict';

angular.module('issueTrackingSystem.projects.allProjects.AllProjectsController',[
        'issueTrackingSystem.projects.allProjects.allProjectsService'
    ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/projects/all', {
                templateUrl: 'app/projects/allProjects/all-projects.html',
                controller: 'AllProjectsController'
            })
    }])
    .controller('AllProjectsController', [
        '$scope',
        'allProjectsService',
        'notyService',
        function AllProjectsController($scope, allProjectsService, notyService){

            $scope.projectsParams = {
                pageSize: 10,
                pageNumber: 1
            };

            $scope.getAllProjects = function() {
                allProjectsService.getAllProjects($scope.projectsParams)
                    .then(
                        function success(data) {
                            $scope.allProjects = data.Projects;
                            $scope.projectsCount  = data.TotalPages * $scope.projectsParams.pageSize;
                        }, function error(err) {
                            notyService.showError('Cannot load all projects at the moment!');
                        });
            };

            $scope.getAllProjects();
        }]);