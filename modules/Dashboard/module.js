angular.module('#Dashboard',['Events', 'SystemHealth'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'modules/Dashboard/views/dashboard.html',
                controller: 'DashboardController'
            });
    }]);
