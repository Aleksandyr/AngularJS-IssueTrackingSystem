'use strict';

angular.module('issueTrackingSystem.projects.ProjectsController',[
        'issueTrackingSystem.projects.projectsService'
    ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/projects/all', {
                templateUrl: 'app/projects/templates/all-projects.html',
                controller: 'AllProjectsController'
            })
            .when('/projects/:id', {
                templateUrl: 'app/projects/templates/view-project.html',
                controller: 'ViewProjectController',
                access: {
                    requiresLoggedUser: true
                }
            })
            .when('/projects/edit/:id', {
                templateUrl: 'app/projects/templates/project-edit.html',
                controller: 'EditProjectController',
                access: {
                    requiresLoggedUser: true
                }
            })
    }])
    .controller('AllProjectsController', [
        '$scope',
        'projectService',
        'notyService',
        function AllProjectsController($scope, projectService, notyService){

            $scope.projectsParams = {
                pageSize: 10,
                pageNumber: 1
            };

            $scope.getAllProjects = function() {
                projectService.getAllProjects($scope.projectsParams)
                    .then(
                        function success(data) {
                            $scope.allProjects = data.Projects;
                            $scope.projectsCount  = data.TotalPages * $scope.projectsParams.pageSize;
                        }, function error(err) {
                            notyService.showError('Cannot load all projects at the moment!');
                        });
            };

            $scope.getAllProjects();
        }])
        .controller('ViewProjectController', [
            '$scope',
            '$routeParams',
            'projectService',
            'notyService',
            function ViewProjectController($scope, $routeParams, projectService, notyService){
                $scope.getProjectById = function(projectId) {
                    projectService.getProjectById(projectId)
                        .then(
                            function success(data) {
                                $scope.project = data.data;
                            }, function error(err) {
                                notyService.showError('Cannot load project at the moment!');
                            });
                };

                $scope.getProjectIssues = function(projectId){
                    projectService.getProjectIssues(projectId)
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
        }])
        .controller('EditProjectController', [
            '$scope',
            '$routeParams',
            '$location',
            'projectService',
            'notyService',
            function EditProjectController($scope,$routeParams, $location, projectService, notyService){
                $scope.allUsers();

                $scope.editProject = function() {
                    if(typeof $scope.currentLabels === 'string'){
                        $scope.currentLabels = getArrayOfWords($scope.currentLabels);
                    }

                    if(typeof $scope.currentPriorities === 'string'){
                        $scope.currentPriorities = getArrayOfWords($scope.currentPriorities);
                    }

                    var projectForEdit = {
                        Id: $scope.project.Id,
                        Description: $scope.project.Description,
                        Labels: $scope.currentLabels,
                        Priorities: $scope.currentPriorities,
                        Name: $scope.project.Name,
                        LeadId: $scope.project.Lead.Id
                    };

                    projectService.editProject(projectForEdit)
                        .then(
                            function success() {
                                notyService.showSuccess('Project successfully edited!');
                                $location.path('projects/' + $scope.project.Id);
                            }, function error() {
                                notyService.showError('Project is not edited!');
                            });
                };

                function getProjectById(id){
                    projectService.getProjectById(id)
                        .then(function success(project){
                            $scope.project = project.data;
                            $scope.currentLabels  = [];
                            $scope.currentPriorities  = [];
                            $scope.project.Labels.forEach(function(label) {
                                $scope.currentLabels.push(label.Name);
                            });
                            $scope.project.Priorities.forEach(function(priority) {
                                $scope.currentPriorities.push(priority.Name);
                            });
                        }, function error(err){
                            notyService.showError('Cannot load this project!');
                        })
                }

                function getArrayOfWords(str){
                    return str.split(',');
                }

                getProjectById($routeParams.id);
            }]);