angular.module('NgModular').factory('config', function () {

    var location = window.location;
    var conf = {};

    conf.apiCloudCtx = '/api/v1';
    conf.apiCloudCtxV2 = '/api/v2';
    conf.apiCloudCtxV3 = '/api/v3';


    conf.ENV = 'LIVE';
    conf.userRefreshRate = 3600000;
    conf.refreshRate = 60000;

    return conf;
});