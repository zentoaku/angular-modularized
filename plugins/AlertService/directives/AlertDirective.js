angular.module('AlertService').directive("alert", function(){
    return {
        templateUrl: 'plugins/AlertService/views/alert.html',
        restrict: 'E',
        controller: 'AlertCtrl'
    };
});