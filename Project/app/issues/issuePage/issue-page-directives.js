angular.module('issueTrackingSystem.issues.issuePage.issuePageDirectives', [])
    .directive('ngComments', [function(){
        return {
            restrict: 'A',
            templateUrl: 'app/issues/issuePage/templates/comments.html'
        }
    }])
    .directive('ngStatusTable', [function(){
        return {
            restrict: 'A',
            templateUrl: 'app/issues/issuePage/templates/status-table.html'
        }
    }])
    .directive('ngIssueInfo', [function(){
        return {
            restrict: 'A',
            templateUrl: 'app/issues/issuePage/templates/issue-info.html'
        }
    }]);