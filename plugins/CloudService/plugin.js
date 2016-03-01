angular.module('CloudService',['restangular','angular-cache']).config(['RestangularProvider', function (RestangularProvider){
        RestangularProvider.setDefaultHeaders({'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'});
        RestangularProvider.setDefaultHttpFields({withCredentials: true});
}]).config(function (CacheFactoryProvider) {
    angular.extend(CacheFactoryProvider.defaults, { maxAge: 15 * 60 * 1000 });
  });
