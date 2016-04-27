angular.module('issueTrackingSystem.issues.issuePage.addIssueService', [])
    .factory('addIssueService', [
        '$http', '$q', 'BASE_URL',
        function($http, $q, BASE_URL){
            function addIssue (issue){
                var deferred = $q.defer();

                var dataLabels = '';
                issue.Labels.forEach(function(l, index) {
                    dataLabels += '&labels[' + index + '].Name=' + l.trim();
                });

                var data = 'Title=' + issue.Title +
                    '&Description=' + issue.Description +
                    '&DueDate=' + issue.DueDate +
                    '&ProjectId=' + issue.ProjectId +
                    '&AssigneeId=' + issue.AssigneeId +
                    '&PriorityId=' + issue.PriorityId +
                    dataLabels;

                var requestData = {
                    method: 'POST',
                    url: BASE_URL + 'issues/',
                    data: data,
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage.authToken,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                };

                $http(requestData)
                    .then(
                        function success(data){
                            deferred.resolve(data);
                        },
                        function error(err){
                            deferred.reject(err);
                        }
                    );


                return deferred.promise;
            }

            return {
                addIssue: addIssue
            }
        }
    ]);