'use strict';

angular.module('issueTrackingSystem.home.homeService', [])
    .factory('homeService', ['$http','$q','BASE_URL',function($http, $q, BASE_URL){

        function getUserIssues(pageParams){
            var deferred = $q.defer();

            var url = BASE_URL + 'issues/me?orderBy=DueDate desc&pageSize=' +
                pageParams.pageSize +
                '&pageNumber=' +
                pageParams.pageNumber;

            $http.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage.authToken;
            $http.get(url)
                .then(function(response){
                    deferred.resolve(response.data);
                }, function(err){
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        return {
            getUserIssues: getUserIssues
        }
    }]);