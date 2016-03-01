'use strict';

angular.module('NgModular').factory('i18n', ['$cookies', '$timeout', '$filter', function ($cookies, $timeout, $filter) {
    return new I18n($cookies, $timeout, $filter);
}]);

/**
 *
 * I18n class used for internationalization (JQuery Plugin).
 * @class I18n
 * @constructor
 * @param {String} bundelName name of bundle
 * @param {String} bundlePath path of bundle
 */
var I18n = function($cookies, $timeout, $filter) {

    this.GC_CURRENT_LANGUAGE = 'GC_CURRENT_LANGUAGE';
    this.DATE_COMPARE_PATTERN = 'yyyy-MM-dd';

    this.bundlePath = '/bundle/';
    this.currentLanguage = $cookies[this.GC_CURRENT_LANGUAGE];
    this.filter = $filter;

    // Supported languages.
    this.supportedLanguages = ['en'];

    var self = this;
};

I18n.prototype = {

    init : function() {
        if (!this.currentLanguage) {
            // Default language
            this.currentLanguage = 'en';
        }
        jQuery.i18n.properties({
            name : 'Messages',
            path : this.bundlePath,
            mode : 'both',
            cache : false,
            language : this.currentLanguage,
            callback : function() {
                // We specified mode: 'both' so translated values will be
                // available as JS vars/functions and as a map
            }
        });
    },

    changeLanguage : function(lang) {
        jQuery.i18n.properties({
            name : 'Messages',
            path : this.bundlePath,
            mode : 'both',
            cache : false,
            callback : function() {
                // We specified mode: 'both' so translated values will be
                // available as JS vars/functions and as a map
            }
        });
    },

    /**
     * Returns list of supported languages.
     *
     * @method  getSupportedLanguages
     *
     * @return  {Array} List of strings with country literals (e.g. 'de') describing supported languages.
     */
    getSupportedLanguages : function () {
        
        return this.supportedLanguages;
    },

    prop : function(label) {
        return jQuery.i18n.prop(label);
    },

    /**
     * Formats the timestamp to the proper string format based on current language settings.
     *
     * @method  formatTs
     *
     * @param   timestamp   {Timestamp}
     *
     * @return  {String}    formatted string
     */
    formatTs : function(timestamp) {
        var today = new Date();
        var yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        var eventDateStr = this.filter('date')(timestamp, this.DATE_COMPARE_PATTERN);
        var todayDateStr = this.filter('date')(today, this.DATE_COMPARE_PATTERN);
        var yesterdayDateStr = this.filter('date')(yesterday, this.DATE_COMPARE_PATTERN);

        var dateString = this.filter('date')(timestamp, this.prop("label_date_format"));
        if (eventDateStr === todayDateStr) {
            dateString = this.prop('label_today');
        } else if (eventDateStr === yesterdayDateStr) {
            dateString = this.prop('label_yesterday');
        }

        return dateString + " " + this.filter('date')(timestamp, this.prop("label_time_format"));
    },

    setCurrentLanguage : function (lang) {

        this.setCookie(lang);
        this.changeLanguage(lang);

        //TODO: verify if it is necessary.
        if (window.location.href.indexOf('web/' + lang) === -1) {
            window.location.href = window.location.href.replace(/web\/../g, 'web/' + lang);
        }
    },
    
    getCookie : function (c_name) {

        var i,x,y,ARRcookies=document.cookie.split(";");

        for (i=0;i<ARRcookies.length;i++) {

            x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
            y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
            x=x.replace(/^\s+|\s+$/g,"");

            if (x === c_name) {
                return unescape(y);
            }
        }
    },

    setCookie : function (value) {
        document.cookie = this.GC_CURRENT_LANGUAGE + '=' + value + '; path=/';
    },

    getCurrentLanguage : function() {
        return this.checkCookie() ? this.getCookie(this.GC_CURRENT_LANGUAGE) : 'en';
    },

    checkCookie : function () {

        var language = this.getCookie(this.GC_CURRENT_LANGUAGE);

        if (language !== null && this.supportedLanguages.indexOf(language) !== -1) {
            return true;
        } else {
            return false;
        }
    }
};

// Init i18n module.
angular.module('wfe').run(['i18n', '$rootScope', function (i18n, $rootScope) {
    i18n.init();
    $rootScope.label = function (key) {
        return $.i18n.prop(key);
    };
}]);