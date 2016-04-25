'use strict';

angular.module('issueTrackingSystem.projects.addProject.AddProjectController', [
        'issueTrackingSystem.projects.addProject.AddProjectService'
    ])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/projects/add', {
            templateUrl: 'app/projects/addProject/add-project.html',
            controller: 'AddProjectController',
            access: {
                requiresAdmin: true
            }
        });
    }])
    .controller('AddProjectController', [
        '$scope',
        '$location',
        'notyService',
        'addProjectService',
        function AddProjectController($scope, $location, notyService, addProjectService){
            $scope.allUsers();

            $scope.addProject = function(project) {
                project.labels = getArrayOfWords(project.labels);
                project.priorities = getArrayOfWords(project.priorities);

                addProjectService.addProject(project)
                    .then(
                        function success(data) {
                            notyService.showSuccess('Successfully add project!');
                            $location.path('projects/' + data.data.Id);
                        }, function error() {
                            notyService.showError('Cannot add this project!');
                        });
            };

            function getArrayOfWords(str){
                return str.split(',');
            }
        }]);