angular.module('issueTrackingSystem.issues.editIssue.editIssueService', [])
    .factory('editIssueService', [
        '$http', '$q', 'BASE_URL',
        function($http, $q, BASE_URL){
            function editIssue(issue, id){
                var deferred = $q.defer();
                var dataLabels = '';
                issue.Labels.forEach(function(label, index) {
                    dataLabels += '&labels[' + index + '].Name=' + label.trim();
                });

                var data = 'Title=' + issue.Title +
                    '&Description=' + issue.Description +
                    '&DueDate=' + issue.DueDate  +
                    '&AssigneeId=' + issue.AssigneeId +
                    '&PriorityId=' + issue.PriorityId +
                    dataLabels;
                var requestData = {
                    method: 'PUT',
                    url: BASE_URL + 'issues/' + id,
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
                editIssue: editIssue
            }
        }
    ]);