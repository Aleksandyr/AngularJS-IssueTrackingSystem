'use strict';

angular.module('issueTrackingSystem.account.changePassword.service', [])
    .factory('changePasswordService', [
        '$q',
        '$http',
        'BASE_URL',
        function ($q, $http, BASE_URL) {
            function changePassword(user){
                var deffered = $q.defer();

                $http.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage.authToken;
                $http.post(BASE_URL + 'api/account/changePassword', user)
                    .then(function (response) {
                        deffered.resolve(response.data)
                    }, function (error) {
                        deffered.reject(error);
                    });

                return deffered.promise;
            }

            return {
                changePassword: changePassword
            }
    }]);
