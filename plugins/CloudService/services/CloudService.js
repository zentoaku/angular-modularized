angular.module('CloudService').factory('CloudService', ['CloudRest', 'CloudMock', 'config', function (CloudRest, CloudMock, config) {
    if(config.ENV === 'DEVEL') {
        return CloudMock;
    } else {
        return CloudRest;
    }
}]);