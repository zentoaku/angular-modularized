angular.module('Auth', [])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/redirect', {
                template: '',
                controller: 'RedirectCtrl',
                public: true
            });
    }]);
