angular.module('issueTrackingSystem.issues.issuePage.addIssueController', [
        'issueTrackingSystem.issues.issuePage.addIssueService'
])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/projects/addIssue/:id', {
            controller: 'AddIssueController',
            templateUrl: 'app/issues/addIssue/add-issue.html',
            access: {
                requiresLoggedUser: true
            }
        })
    }])
    .controller('AddIssueController', [
        '$scope', '$routeParams', '$location', 'addIssueService', 'projectService', 'notyService',
        function($scope, $routeParams, $location, addIssueService, projectService, notyService){
            $scope.allUsers();

            projectService.getProjectById($routeParams.id)
                .then(
                    function success (project){
                        $scope.projectPriorities = project.data.Priorities;
                    },
                    function err(err){
                        notyService.showError('Cannot load current project at the moment', err);
                    }
                );

            $scope.addIssue = function(){
                var issueToAdd = {
                    Title: $scope.addIssue.Title,
                    Description: $scope.addIssue.Description,
                    DueDate: $scope.addIssue.DueDate.toISOString(),
                    ProjectId: $routeParams.id,
                    AssigneeId: $scope.addIssue.AssigneeId,
                    PriorityId: $scope.addIssue.PriorityId,
                    Labels: $scope.addIssue.Labels.split(',')
                };
                addIssueService.addIssue(issueToAdd)
                    .then(
                        function success(){
                            notyService.showError('Successfully added issue!');
                            $location.path('projects/' + $routeParams.id );
                        },
                        function error(err){
                            notyService.showError('Cannot add issue', err);
                        }
                    )
            }
        }
    ]);