(function(){
    'use strict';

    angular.module('issueTrackingSystem', [
        'ngRoute',
        'issueTrackingSystem.home',
        'issueTrackingSystem.users.authentication',
        'issueTrackingSystem.users.identity',
        'issueTrackingSystem.common',
        'issueTrackingSystem.logout'
    ])
        .config(['$routeProvider', function($routeProvider) {
          $routeProvider.otherwise({redirectTo: '/'});
        }])
        .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');
}());
