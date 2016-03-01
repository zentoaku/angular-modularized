angular.module('#ForgotPassword').controller('ForgotPasswordCtrl', ['$scope', 'User', 'i18n', 'Auth', '$window', function ($scope, User, i18n, Auth, $window) {
    
    Auth.isMaintenance(function (code, data) {
        if(code === 200 && data.isMaintenance === true)
            $window.location.reload();
        },function (code, data) {
    });

    $scope.userEmail = '';
    
    /**
     Handles submit button click event and calls propper userMgmtService methods.

     @method submitClick
    **/
    $scope.submitClick = function () {
        
        Auth.isMaintenance(function (code, data) {
            if(code === 200 && data.isMaintenance === true)
                $window.location.reload();
            },function (code, data) {
        });
        
        User.forgotPassword($scope.userEmail, function (code, data) {
            
        }, function (code, data) {

        });
    };

}]);