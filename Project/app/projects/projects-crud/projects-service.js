'use strict';

angular.module('issueTrackingSystem.projects.projects-crud.projectsService', [])
    .factory('projectsService', [
        '$http',
        '$q',
        'BASE_URL',
        function($http, $q, BASE_URL){
            function getProjectById(projectId){
                var deferred = $q.defer();

                var url = BASE_URL + 'projects/' + projectId;

                $http.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage.authToken;
                $http.get(url)
                    .then(function(response){
                        console.log(response);
                        deferred.resolve(response);
                    }, function(err){
                        deferred.reject(err);
                    });

                return deferred.promise;
            }

            function getProjectIssues(projectId){
                var deferred = $q.defer();

                var url = BASE_URL + 'projects/' + projectId + '/Issues';

                $http.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage.authToken;
                $http.get(url)
                    .then(function(response){
                        console.log(response);
                        deferred.resolve(response);
                    }, function(err){
                        deferred.reject(err);
                    });

                return deferred.promise;
            }

            return {
                getProjectById: getProjectById,
                getProjectIssues: getProjectIssues
            }
        }]);