angular.module('#Register',['User'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/register', {
                templateUrl: 'modules/Register/views/register.html',
                controller: 'RegisterCtrl',
                public: true
            })
            .when('/confirmRegistration/activationCode/:code', {
                templateUrl: 'modules/Register/views/confirm.html',
                controller: 'RegisterConfirmCtrl',
                public: true
            })
            .when('/:lang/confirmRegistration/activationCode/:code', {
                templateUrl: 'modules/Register/views/confirm.html',
                controller: 'RegisterConfirmCtrl',
                public: true
            });;
    }]);
