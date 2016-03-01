angular.module('#Register').controller('RegisterConfirmCtrl', ['$scope', 'User', '$routeParams', function($scope, User, $routeParams){
        
    $scope.success = 'NO SUCCESS';
        
    User.registerConfirm($routeParams.code).then(function(data){
        $scope.success = 'SUCCESS';
    },function(){});
    
}]);