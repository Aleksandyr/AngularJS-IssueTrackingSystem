'use strict';

angular.module('issueTrackingSystem.projects.projectsService', [])
    .factory('projectService', [
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

            function getProjectById(projectId){
                var deferred = $q.defer();

                var url = BASE_URL + 'projects/' + projectId;

                $http.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage.authToken;
                $http.get(url)
                    .then(function(response){
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
                        deferred.resolve(response);
                    }, function(err){
                        deferred.reject(err);
                    });

                return deferred.promise;
            }

            function editProject(project){
                var deferred = $q.defer();

                var dataLabels = '';
                project.Labels.forEach(function(label, index) {
                    dataLabels += '&labels[' + index + '].Name=' + label.trim();
                });
                var dataPriorities='';
                project.Priorities.forEach(function(priority, index) {
                    dataPriorities += '&priorities[' + index + '].Name=' + priority.trim();
                });
                var data = 'Name=' + project.Name +
                    '&Description=' + project.Description +
                    dataLabels + dataPriorities +
                    '&LeadId=' + project.LeadId;

                var requestData = {
                    method: 'PUT',
                    url: BASE_URL + 'projects/' + project.Id,
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage.authToken,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: data
                };

                $http(requestData)
                    .then(
                        function success(data){
                            deferred.resolve(data);
                        }, function error(err) {
                            deferred.reject(err);
                        });

                return deferred.promise;
            }

            return {
                getAllProjects: getAllProjects,
                getProjectById: getProjectById,
                getProjectIssues: getProjectIssues,
                editProject: editProject
            }
        }]);