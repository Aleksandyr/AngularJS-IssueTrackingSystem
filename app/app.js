(function(){
    'use strict';

    angular.module('issueTrackingSystem', [
        'ngRoute',
        'issueTrackingSystem.home',
        'issueTrackingSystem.users.authentication',
        'issueTrackingSystem.users.identity',
        'issueTrackingSystem.common.mainController',
        'issueTrackingSystem.logout',
        'issueTrackingSystem.common.notyService'
    ])
        .config(['$routeProvider', function($routeProvider) {
          $routeProvider.otherwise({redirectTo: '/'});
        }])
        .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');
}());
