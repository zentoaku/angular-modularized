angular.module('NgModular', ['ngRoute','ngCookies','AlertService','Auth','#Login', '#Dashboard', '#Register', '#ForgotPassword', 'Maintenance'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo:'/'});
    }])
    .run(['$location', '$rootScope', '$cookies', 'MaintenanceService',function ($location, $rootScope, $cookies, MaintenanceService) {
        
        MaintenanceService.isMaintenance().then(function(){
            $location.path('/maintenance');
        });
            
        $rootScope.$on('$routeChangeStart', function (event, nextRoute, currRoute) {
            var loggedIn = $cookies.get('reefssid');
            if((nextRoute.public === undefined || nextRoute.public === false) && loggedIn === undefined) {
                $location.path('/unauthorized');
            }
        });
        
        $rootScope.routeVisited = function (route, service) {
            service.lastVisited = route;
        };
    }]);
