'use strict';

angular.module('issueTrackingSystem.home.commonService', [])
    .factory('commonService', ['$http','$q','BASE_URL',function($http, $q, BASE_URL){

        function getUserIssues(){
            var deferred = $q.defer();

            $http.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage.authToken;
            $http.get(BASE_URL + 'Users/')
                .then(function(response){
                    deferred.resolve(response);
                }, function(err){
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        return {
            getUserIssues: getUserIssues
        }
    }]);