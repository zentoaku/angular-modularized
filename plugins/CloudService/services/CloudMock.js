angular.module('CloudService').factory('CloudMock', ['$q', '$window', 'Restangular', function ($q, $window, Restangular) {

        var REST = Restangular.all();

        var Service = function (rest) {
            var _eventList = {};
            var _elementsList = {};

            this.authorize = function (returnToRoute) {
                var redirectUrl = '';
                if (returnToRoute !== undefined && returnToRoute !== '') {
                    redirectUrl = $window.location.protocol + '//' + $window.location.host + '/#' + returnToRoute;
                } else {
                    redirectUrl = $window.location.href;
                }
                $window.location.href = redirectUrl;
            };
            
            this.logout = function () 
            {
                var d = $q.defer();
                d.resolve();
                return d.promise;
            };
        };

        var CloudSrv = new Service(REST);

        return CloudSrv;
    }]);