angular.module('#Login',['User', 'Auth'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/unauthorized', {
                templateUrl: 'modules/Login/views/login.html',
                controller: 'LoginCtrl',
                public: true
            });
    }]);
