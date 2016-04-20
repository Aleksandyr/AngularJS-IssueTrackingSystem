'use strict';

angular.module('issueTrackingSystem.account.users.allUsersService', [])
    .factory('allUsersService', ['$http','$q','BASE_URL',function($scope, $q, BASE_URL){
        function getAllUsers(){
            var deffered = q.defer();

            http.get(BASE_URL + 'users')
                .then(function(response){
                    deffered.resolve(response.data);
                }, function(err){
                    deffered.reject(err);
                });

            deffered.promise();
        }

        return {
            getAllUsers: getAllUsers
        }
    }]);