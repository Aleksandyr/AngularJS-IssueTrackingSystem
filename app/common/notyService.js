(function(){
    angular.module('issueTrackingSystem.common.notyService', [])
        .factory('notyService', [function(){
            function showError(message) {
                noty({
                    text: message,
                    type: 'error',
                    timeout: 1000,
                    layout: 'topCenter',
                });
            }

            function showSuccess(message) {
                noty({
                    text: message,
                    type: 'success',
                    layout: 'topCenter',
                    timeout: 1000
                });
            }

            return {
                showSuccess: showSuccess,
                showError: showError
            }
        }]);
}());