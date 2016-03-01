angular.module('#Login').controller('LoginCtrl', ['$scope', 'User', function($scope, User) {
    
    $scope.submitLogin = function () {
        User.login($scope.email, $scope.password);
    };
    
}]);