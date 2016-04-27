angular.module('issueTrackingSystem.issues.issuePage.issuePageController', [
    'issueTrackingSystem.issues.issuePage.issuePageService'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/issues/:id', {
            controller: 'IssuePageController',
            templateUrl: 'app/issues/issuePage/templates/issue-page.html',
            access: {
                requiresLoggedUser: true
            }
        })
    }])
    .controller('IssuePageController', [
        '$scope', '$routeParams', '$location', 'issuePageService', 'identity', 'notyService',
        function ($scope, $routeParams, $location, issuePageService, identity, notyService) {
            $scope.newComment = {};

            $scope.changeStatus = function (statusId) {
                issuePageService.changeIssueStatus($scope.currentIssue.Id, statusId)
                    .then(
                        function success() {
                            getIssue();
                        },
                        function error(err) {
                            notyService.showError('Cannot change status at the moment', err)
                        }
                    )
            };

            function getIssue() {
                issuePageService.getIssueById($routeParams.id)
                    .then(
                        function success(issue) {
                            $scope.currentIssue = issue.data;
                            $scope.isAssignee = $scope.currentIssue.Assignee.Id === JSON.parse(sessionStorage.currentUser).Id;
                            $scope.currentIssueLabels = [];
                            issue.data.Labels.forEach(function (label) {
                                $scope.currentIssueLabels.push(label.Name);
                            });
                            identity.setProjectLeader($scope.currentIssue.Project.Id)
                                .then(
                                    function success() {
                                        $scope.isProjectLeader = identity.isProjectLeader();
                                    }
                                );
                        },
                        function error(err) {
                            notyService.showError('Cannot load issue at the moment', err)
                        }
                    );
            }

            function getComments (){
                issuePageService.getIssueComments($routeParams.id)
                    .then(
                        function success(comments){
                            $scope.comments = comments.data;
                        },
                        function error (err){
                            console.log(err);
                        }
                    )
            }

            $scope.addComment = function (comment){
                issuePageService.addComment(comment, $routeParams.id)
                    .then(
                        function success(data){
                            $scope.newComment = {};
                            $scope.comments = data.data;
                        },
                        function error(err){
                            notyService.showError('Cannot add comment at the moment', err);
                        }
                    )
            };


            getIssue();
            getComments();
        }]);