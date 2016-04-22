'use strict';

angular.module('issueTrackingSystem.projects.projects-crud.ProjectsController',[
        'issueTrackingSystem.projects.projects-crud.projectsService'
    ])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/projects/:id', {
            templateUrl: 'app/projects/projects-crud/templates/view-project.html',
            controller: 'ViewProjectController',
            access: {
               requiresLoggedUser: true
            }
        });
    }])
    .controller('ViewProjectController', [
        '$scope',
        '$routeParams',
        'projectsService',
        'notyService',
        'identity',
        function ViewProjectController($scope, $routeParams, projectsService, notyService, identity){
            $scope.getProjectById = function(projectId) {
                projectsService.getProjectById(projectId)
                    .then(
                        function success(data) {
                            $scope.project = data.data;
                        }, function error(err) {
                            notyService.showError('Cannot load all projects at the moment!');
                        });
            };

            $scope.getProjectIssues = function(projectId){
                projectsService.getProjectIssues(projectId)
                    .then(
                        function success(data){
                            $scope.projectIssues = data.data;
                        }, function error(err){
                            notyService.showError('Cannot load issues for this project');
                        }
                    )
            };

            $scope.getProjectById($routeParams.id);
            $scope.getProjectIssues($routeParams.id);
        }]);