angular.module('issueTrackingSystem.issues.editIssue.editIssueController', [
    'issueTrackingSystem.issues.editIssue.editIssueService'
])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/issues/edit/:id', {
            controller: 'EditIssueController',
            templateUrl: 'app/issues/editIssue/edit-issue.html',
            access: {
                requiresLoggedUser: true
            }
        })
    }])
    .controller('EditIssueController', [
        '$scope', '$routeParams', '$location', 'editIssueService', 'issuePageService', 'projectService', 'notyService',
        function($scope, $routeParams, $location, editIssueService, issuePageService, projectService, notyService){
            $scope.allUsers();

            issuePageService.getIssueById($routeParams.id)
                .then(
                    function success(issue){
                        $scope.currentIssue = issue.data;
                        $scope.currentIssueDueDateLocal =new Date(issue.data.DueDate);
                        $scope.issuePriority = issue.data.Priority.Id;
                        $scope.currentIssueLabels = [];

                        issue.data.Labels.forEach(function(label) {
                            $scope.currentIssueLabels.push(label.Name);
                        });

                        projectService.getProjectById(issue.data.Project.Id)
                            .then(function success(project) {
                                $scope.projectPriorities = project.data.Priorities;
                            });
                    },
                    function error(err){

                    }
                );

            $scope.editIssue = function(){
                if(typeof $scope.currentIssueLabels === 'string') {
                    $scope.currentIssueLabels = $scope.currentIssueLabels.split(',')
                }

                var issueToEdit = {
                    Title: $scope.currentIssue.Title,
                    Description: $scope.currentIssue.Description,
                    DueDate: $scope.currentIssueDueDateLocal.toISOString(),
                    AssigneeId: $scope.currentIssue.Assignee.Id,
                    PriorityId: $scope.issuePriority,
                    Labels: $scope.currentIssueLabels
                };

                editIssueService.editIssue(issueToEdit, $routeParams.id)
                    .then(
                        function success(responce){
                            notyService.showSuccess('Successfully edited issue!');
                            $location.path('issues/' + responce.data.Id);
                        },
                        function error(err){
                            notyService.showError('Cannot edit issue at the moment', err);
                        }
                    )
            }
        }]);