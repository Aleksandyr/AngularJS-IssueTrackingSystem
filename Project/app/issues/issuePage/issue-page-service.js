'use strict';

angular.module('issueTrackingSystem.issues.issuePage.issuePageService', [])
    .factory('issuePageService', [
        '$http', '$q', 'BASE_URL',
        function ($http, $q, BASE_URL) {
            function getIssueById(issueId) {
                var deferred = $q.defer();

                $http.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage.authToken;
                $http.get(BASE_URL + 'Issues/' + issueId)
                    .then(
                        function success(data) {
                            deferred.resolve(data);
                        },
                        function error(err) {
                            deferred.reject(err);
                        }
                    );

                return deferred.promise;
            }

            function getIssueComments (issueId){
                var deferred = $q.defer();

                $http.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage.authToken;
                $http.get(BASE_URL + 'Issues/' + issueId + '/comments')
                    .then(
                        function success(data) {
                            deferred.resolve(data);
                        },
                        function error(err) {
                            deferred.reject(err);
                        }
                    );

                return deferred.promise;
            }

            function changeIssueStatus (issueId, statusId){
                var deferred = $q.defer();

                $http.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage.authToken;
                $http.put(BASE_URL + 'Issues/' + issueId + '/changestatus?statusid=' + statusId, null)
                    .then(
                        function success(data) {
                            deferred.resolve(data);
                        },
                        function error(err) {
                            deferred.reject(err);
                        }
                    );

                return deferred.promise;
            }

            function addComment (comment, issueId){
                var deferred = $q.defer();
                var data = {'Text': comment};

                $http.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage.authToken;
                $http.post(BASE_URL + 'Issues/' + issueId + '/comments', data)
                    .then(
                        function success(data) {
                            deferred.resolve(data);
                        },
                        function error(err) {
                            deferred.reject(err);
                        }
                    );

                return deferred.promise;
            }

            return {
                getIssueById: getIssueById,
                changeIssueStatus: changeIssueStatus,
                getIssueComments: getIssueComments,
                addComment: addComment
            }
        }
    ]);