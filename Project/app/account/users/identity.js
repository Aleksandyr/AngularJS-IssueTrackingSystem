'use strict';

angular.module('issueTrackingSystem.account.users.identity', [])
    .factory('identity', ['BASE_URL', '$q', '$http',
        function (BASE_URL, $q, $http) {

            var projectLeader = false;

            function isProjectLeader(){
                return projectLeader;
            }

            function setProjectLeader (projectId){
                var deferred = $q.defer();

                $http.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage.authToken;
                $http.get(BASE_URL + 'projects/' + projectId)
                    .then(function (data) {
                        projectLeader = data.data.Lead.Id === JSON.parse(sessionStorage.currentUser).Id;
                        deferred.resolve();
                    }, function (err) {
                        deferred.reject(err)
                    });
                return deferred.promise;

            }

            function getCurrentUser(){
                var deferred = $q.defer();

                $http.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage.authToken;
                $http.get(BASE_URL + 'users/me')
                    .then(function (data) {
                        deferred.resolve(data.data);
                    }, function (err) {
                        deferred.reject(err)
                    });

                return deferred.promise;
            }

            function isAdmin(){
                if(sessionStorage['currentUser']){
                    var current = JSON.parse(sessionStorage.currentUser);
                    return current.isAdmin;
                }
            }

            function hasLoggedUser() {
                return sessionStorage.authToken !== undefined;
            };

            return {
                hasLoggedUser: hasLoggedUser,
                getCurrentUser: getCurrentUser,
                isAdmin: isAdmin,
                isProjectLeader: isProjectLeader,
                setProjectLeader: setProjectLeader
            };
        }]);