angular.module('CloudService').factory('CloudRest', ['Restangular', 'config', '$location', '$window', '$q', 'CacheFactory', '$http', function (Restangular, config, $location, $window, $q, CacheFactory, $http) {

        var authURL = config.URL;
        var CloudServiceCache;
        
        var memoryCache = {};
        var cachePolyfill = {
            getItem: function (key) { return memoryCache[key]; },
            setItem: function (key, value) { memoryCache[key] = value; },
            removeItem: function (key) { delete memoryCache[key]; }
        };
        
        var cacheOptions = {
                deleteOnExpire: 'passive',
                recycleFreq: 5 * 60 * 1000,
                maxAge: 5 * 60 * 1000,
                storageMode: 'sessionStorage',
                storagePrefix: ''
        };
        if(!window.sessionStorage) {
            cacheOptions.storageMode = 'memory';
            cacheOptions.storageImpl = cachePolyfill;
        }
        
        if (!CacheFactory.get('CloudServiceCache')) {
            CacheFactory('CloudServiceCache', cacheOptions);
        }
        CloudServiceCache = CacheFactory.get('CloudServiceCache');
        
        var REST = Restangular.withConfig(function (RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl(config.apiCloudURL);
            RestangularConfigurer.setDefaultHttpFields({cache: CloudServiceCache, withCredentials: true});
            RestangularConfigurer.setDefaultHeaders({'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'});
            RestangularConfigurer.addErrorInterceptor(function (response, deffered, responseHandler) {
                if (response.status === 401) {
                    CloudSrv.authorize();
                    return false;
                } else if (response.status === 403) {
                    $location.path('/unauthorized');
                    return false;
                }
                return true;
            });
        });
        
        var REST_noCache = Restangular.withConfig(function (RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl(config.apiCloudURL);
            RestangularConfigurer.setDefaultHttpFields({cache: false, withCredentials: true});
            RestangularConfigurer.setDefaultHeaders({'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'});
            RestangularConfigurer.addErrorInterceptor(function (response, deffered, responseHandler) {
                if (response.status === 401) {
                    CloudSrv.authorize();
                    return false;
                } else if (response.status === 403) {
                    $location.path('/unauthorized');
                    return false;
                }
                return true;
            });
        });


        var Service = function (rest, noCache, config) {

            var ctxV1 = rest.all(config.apiCloudCtx);
            var ctxV2 = rest.all(config.apiCloudCtxV2);
            var ctxV3 = rest.all(config.apiCloudCtxV3);
            
            var ctxV1_nc = noCache.all(config.apiCloudCtx);
            var ctxV2_nc = noCache.all(config.apiCloudCtxV2);
            var ctxV3_nc = noCache.all(config.apiCloudCtxV3);
            
            var BATCH_EVENTS_DELETE_PACKET_SIZE = 25;
            
            /**
             * Authorize
             * @param {string} returnToRoute
             * @returns {void}
             */
            this.authorize = function (returnToRoute) {
                var redirectUrl = '';
                if (returnToRoute !== undefined && returnToRoute !== '') {
                    redirectUrl = authURL + $window.location.protocol + '//' + $window.location.host + '/#' + returnToRoute;
                } else {
                    redirectUrl = authURL + $window.location.href;
                }
                $window.location.href = redirectUrl;
            };
            
            /**
             * Logout
             * @returns {promise} logout success/error
             */
            this.logout = function () {
                return ctxV1.one('auth').post('logout', {});
            };

        };

        var CloudSrv = new Service(REST, REST_noCache, config);

        return CloudSrv;
    }]);