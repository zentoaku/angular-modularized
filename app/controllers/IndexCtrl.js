angular.module('NgModular').controller('IndexCtrl', ['$scope', function ($scope) {

    var footerContentAllowedLanguages = [];

    $scope.showIfLanguageAllowed = function () {
        return true;
    };

}]);
