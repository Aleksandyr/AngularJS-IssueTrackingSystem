(function(){
    'use strict';

    angular.module('issueTrackingSystem.users.identity', [])
        .factory('identity', ['BASE_URL', '$q', '$http',
            function (BASE_URL, $q, $http) {

                function hasLoggedUser() {
                    return sessionStorage.authToken !== undefined;
                };

                return {
                    hasLoggedUser: hasLoggedUser
                }
            }]);
}());