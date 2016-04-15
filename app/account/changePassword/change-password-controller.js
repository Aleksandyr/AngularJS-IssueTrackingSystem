(function(){
    'use strict';

    angular.module('issueTrackingSystem.account.changePassword.controller', [])
        .config(['$routeProvider', function($routeProvider){
            $routeProvider.when('/profile/password', {
                templateUrl: 'app/account/changePassword/changePassword.html',
                controller: 'ChangePasswordController'
            })
        }])
        .controller('ChangePasswordController', [
            '$scope',
            'changePasswordService',
            'notyService',
            '$location',
            function($scope, changePasswordService, notyService, $location){
                $scope.changeUserPassword = function ChangePasswordController(data){
                    changePasswordService.changePassword(data)
                        .then(
                            function success(){
                                $location.path('/');
                                notyService.showSuccess('Password successfully changed.');
                            },
                            function error(err){
                                notyService.showError('Something went wrong', err);
                            }
                        )
                };
            }]);
}());