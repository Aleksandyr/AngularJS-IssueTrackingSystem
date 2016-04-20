'use strict';

angular.module('issueTrackingSystem', [
    'ngRoute',

    'issueTrackingSystem.home',

    'issueTrackingSystem.common.notyService',
    'issueTrackingSystem.common.mainController',
    'issueTrackingSystem.common.mainService',

    'issueTrackingSystem.account.users.authentication',
    'issueTrackingSystem.account.users.identity',
    'issueTrackingSystem.account.logout',
    'issueTrackingSystem.account.changePassword.service',
    'issueTrackingSystem.account.changePassword.controller',

    'issueTrackingSystem.admin.adminService',
    'issueTrackingSystem.admin.adminController',
])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/')
    .config(['$routeProvider', function($routeProvider){
        $routeProvider
            .otherwise({
                redirectTo: '/'
            })
    }])
    .run(['$rootScope', '$location', 'identity', function($rootScope, $location, identity) {
        //$scope.isAdmin = identity.isAdmin;

        $rootScope.$on('$locationChangeStart', function(event) {
            if(!identity.hasLoggedUser()) {
                $location.path('/');
            }
        });
    }]);
