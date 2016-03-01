angular.module('NgModular')
    .directive('mainMenu', function () {
        return {
            restrict: 'E',
            controller: 'MainMenuCtrl',
            templateUrl: 'app/views/main_menu.html',
            replace: true
        };
    });
//    .directive('userMenu', function ($route, $location) {
//        return {
//            restrict: 'A',
//            transclude: true,
//            controller: 'NavigationCtrl',
//            scope: {
//                items: '=',
//                principal: '='
//            },
//            templateUrl: '/views/userMenu.html',
//            replace: true,
//            link: function(scope) {
//                angular.element('#login-email').click(function(e) {
//                    e.stopPropagation();
//                });
//                angular.element('#login-password').click(function(e) {
//                    e.stopPropagation();
//                });
//                if ($route.routes[$location.$$path]) {
//                    scope.parentController = $route.routes[$location.$$path].controller;
//                }
//            }
//        };
//    });