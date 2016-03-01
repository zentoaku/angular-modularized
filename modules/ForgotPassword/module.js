angular.module('#ForgotPassword',['User'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/forgot', {
                templateUrl: 'modules/ForgotPassword/views/forgot_password.html',
                controller: 'ForgotPasswordCtrl',
                public: true
            })
            .when('/confirmForgotPassword/:email/:password', {
                templateUrl: 'modules/ForgotPassword/views/change_password.html',
                controller: 'PasswordChangeCtrl',
                public: true
            });
    }]);
