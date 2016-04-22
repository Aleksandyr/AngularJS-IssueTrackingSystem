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
        function ViewProjectController($scope, $routeParams, projectsService, notyService){
            $scope.getProjectById = function(id) {
                projectsService.getProjectById(id)
                    .then(
                        function success(data) {
                            $scope.project = data.data;
                        }, function error(err) {
                            notyService.showError('Cannot load all projects at the moment!');
                        });
            };

            $scope.getProjectById($routeParams.id);
        }]);