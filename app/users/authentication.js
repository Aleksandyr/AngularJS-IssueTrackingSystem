(function(){
    angular.module('issueTrackingSystem.users.authentication', [])
        .factory('authentication', [
            '$http',
            '$q',
            'BASE_URL',
            function ($http, $q, BASE_URL) {
                function registerUser(user) {
                    var deffered = $q.defer();

                    $http.post(BASE_URL + 'api/account/register', user)
                        .then(function (response) {
                            deffered.resolve(response.data)
                        }, function (error) {
                            deffered.reject(error);
                        });

                    return deffered.promise;
                }

                function loginUser(user) {
                    var deferred = $q.defer();
                    var loginData = "grant_type=password&username=" + user.username + "&password=" + user.password;
                    var request = {
                        method: 'POST',
                        url: BASE_URL + 'api/Token',
                        data: loginData,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    };
                    $http(request)
                        .then(function (responce){
                                deferred.resolve(responce.data);
                            },
                            function(err){
                                deferred.reject(err);
                            });

                    return deferred.promise;
                }

                function logout(){
                    var deferred = $q.defer();
                    var request = {
                        method: 'POST',
                        url: BASE_URL + 'api/Account/Logout',
                        headers:{'Authorization': 'Bearer ' + sessionStorage.authToken}
                    };

                    $http(request)
                        .then(function(){
                            deferred.resolve();
                        }, function(err){
                            deferred.reject(err)
                        });

                    return deferred.promise;
                }

                return {
                    loginUser: loginUser,
                    registerUser: registerUser,
                    logout: logout
                }
            }
        ])
}());