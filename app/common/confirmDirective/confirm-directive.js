//angular.module('issueTrackingSystem.common.confirmDirective.confirmClickDirective', [])
//    .directive('ngConfirmClick', [
//        '$modal',
//        '$parse',
//        function($modal, $parse){
//            return {
//                // So the link function is run before ngClick's, which has priority 0
//                priority: -1,
//
//                link: function(scope, element, attrs) {
//                    element.on('click', function(e) {
//                        // Don't run ngClick's handler
//                        e.stopImmediatePropagation();
//
//                        $modal.open({
//                            templateUrl: 'app/common/confirmDirective/confirm-directive.html',
//                            resolve: {
//                                message: function() {
//                                    return attrs.ngConfirm;
//                                }
//                            }
//                        }).result.then(function() {
//                            // Pass original click as '$event', just like ngClick
//                            $parse(attrs.ngClick)(scope, {$event: e});
//                        });
//                    });
//                }
//            };
//        }
//]);