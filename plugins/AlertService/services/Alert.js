angular.module('AlertService').factory('Alert', ['$timeout', function ($timeout) {
    this.queue = [];
    this.alerts = [];
    
    var AlertService = this;
    
    this.TYPE_INFO = 0;
    this.TYPE_SUCCESS = 1;
    this.TYPE_ALERT = 2;
    this.TYPE_ERROR = 3;
    
    this.add = function (msg, type) {
        var alert = new AlertItem(msg, type);
        if(!this.stack(alert)){
            AlertService.queue.push(alert);
        }
        AlertService.alerts.push(alert);
        
//        $timeout(function (){
//            AlertService.closeAlert(alert);
//        }, 10000);
    };
    
    this.closeAlert = function (alert) {
        return AlertService.queue.splice(AlertService.queue.indexOf(alert),1);
    };
    
    this.getAlerts = function (){
        return AlertService.queue;
    };
    
    this.getAll = function () {
        return this.alerts;
    };
    
    this.stack = function (alert) {
        var lastItem = AlertService.queue.slice(-1)[0];
        if(lastItem === undefined) return false;
        return lastItem.compare(alert);
    };
    
    /**
     * AlertItem
     * @param {string} msg
     * @param {int} type
     * @returns {AlertItem}
     */
    var AlertItem = function(msg, type) {
    
        var TYPE_CLASS = {
            0: "alert-info",
            1: "alert-success",
            2: "alert-warning",
            3: "alert-danger"
        };

        var type = type;
        var msg = msg;
        var count = 1;

        this.getType = function() {
            return type;
        };

        this.getClass = function () {
            return TYPE_CLASS[type];
        };

        this.getMsg = function () {
            return msg;
        };

        this.getCount = function () {
            return count;
        };

        this.compare = function (alertItem) {
            if(type === alertItem.getType() && msg === alertItem.getMsg()){
                count++;
                return true;
            }
            return false;
        };

    };
    
    return this;
}]);