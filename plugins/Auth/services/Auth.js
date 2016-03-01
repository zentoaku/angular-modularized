angular.module('Auth').factory('Auth', ['Restangular', 'config', '$q', function (Restangular, config, $q) {
        
        var REST = Restangular.withConfig(function(RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl(config.URL);
        });
        
        return {
            isMaintenance: function () {
                return $q.defer().resolve({});
            }
        };
}]);