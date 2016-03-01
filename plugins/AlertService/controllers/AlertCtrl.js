angular.module('AlertService').controller('AlertCtrl', function ($scope, Alert) {

    $scope.alerts = Alert.getAlerts();
    
    $scope.closeAlert = function (alert) {
        Alert.closeAlert(alert);
    };
    
});