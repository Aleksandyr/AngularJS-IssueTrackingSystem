(function(){
    'use strict';

    angular.module('issueTrackingSystem.account.changePassword.service', [])
        .factory('changePasswordService', [
            '$q',
            '$http',
            'BASE_URL',
            function ($q, $http, BASE_URL) {
                function changePassword(user){
                    var deffered = $q.defer();

                    var request = {
                        method: 'POST',
                        url: BASE_URL + 'api/account/changePassword',
                        data: user,
                        headers: {
                            'Authorization': 'Bearer ' + sessionStorage.authToken
                        }
                    };

                    $http(request)
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
        }])
}());