'use strict';

angular.module('issueTrackingSystem.projects.allProjects.allProjectsService', [])
    .factory('allProjectsService', [
        '$http',
        '$q',
        'BASE_URL',
        function($http, $q, BASE_URL){
            function getAllProjects(projectsParams){
                var deferred = $q.defer();

                var url = BASE_URL + 'projects?filter=&pageSize=' + projectsParams.pageSize + '&pageNumber=' + projectsParams.pageNumber;

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
                getAllProjects: getAllProjects
            }
        }]);