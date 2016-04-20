'use strict';

angular.module('issueTrackingSystem.admin.adminController', [

    ])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/users/all', {
            templateUrl: 'app/admin/all-users.html',
            controller: 'AdminController'
        });
    }])
    .controller('AdminController', [
        '$scope',
        'notyService',
        'adminService',
        function AdminController($scope, notyService, adminService){
            $scope.allUsers();

            $scope.makeAdmin = function(userId){
                adminService.makeAdmin(userId)
                    .then(
                        function success(){
                            $scope.allUsers();
                            notyService.showSuccess('Successfully made this user admin');
                        });
            };
        }]);
