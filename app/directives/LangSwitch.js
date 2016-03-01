angular.module('NgModular').directive('langSwitch', function () {
        return {
            restrict: 'A',
            transclude: true,
            controller: 'LanguageSwitchCtrl',
            scope: {
                languages: '='
            },
            templateUrl: 'app/views/langSwitch.html',
            replace: true
        };
    })