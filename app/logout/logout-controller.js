(function(){
    angular.module('issueTrackingSystem.logout', [])
        .controller('LogoutController', [
            '$scope',
            'authentication',
            function LogoutController($scope, authentication) {
                $scope.logout = function(){
                    authentication.logout()
                        .then(
                            function success(){
                                sessionStorage.clear();
                                console.log('Logout successfull');
                            },
                            function error(err){
                                console.log('Logout unsuccessfull', err);
                            }
                        )
                };
            }]);
}());