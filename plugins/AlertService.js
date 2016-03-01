angular.module("AlertService",[]),angular.module("AlertService").controller("AlertCtrl",function(t,e){t.alerts=e.getAlerts(),t.closeAlert=function(t){e.closeAlert(t)}}),angular.module("AlertService").factory("Alert",["$timeout",function(t){this.queue=[],this.alerts=[];var e=this;this.TYPE_INFO=0,this.TYPE_SUCCESS=1,this.TYPE_ALERT=2,this.TYPE_ERROR=3,this.add=function(t,n){var i=new r(t,n);this.stack(i)||e.queue.push(i),e.alerts.push(i)},this.closeAlert=function(t){return e.queue.splice(e.queue.indexOf(t),1)},this.getAlerts=function(){return e.queue},this.getAll=function(){return this.alerts},this.stack=function(t){var r=e.queue.slice(-1)[0];return void 0===r?!1:r.compare(t)};var r=function(t,e){var r={0:"alert-info",1:"alert-success",2:"alert-warning",3:"alert-danger"},e=e,t=t,n=1;this.getType=function(){return e},this.getClass=function(){return r[e]},this.getMsg=function(){return t},this.getCount=function(){return n},this.compare=function(r){return e===r.getType()&&t===r.getMsg()?(n++,!0):!1}};return this}]),angular.module("AlertService").directive("alert",function(){return{templateUrl:"plugins/AlertService/views/alert.html",restrict:"E",controller:"AlertCtrl"}});