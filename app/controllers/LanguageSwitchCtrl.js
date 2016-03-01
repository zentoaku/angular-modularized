angular.module('NgModular').controller('LanguageSwitchCtrl', ['$scope', 'i18n', function ($scope, i18n) {

    var langClassPrefix = 'lang-'

    $scope.label = function (key) {
        return $.i18n.prop(key);
    };

    $scope.setBodyLanguageClass = function (lang) {
        for (var i in i18n.supportedLanguages) {
            if (i18n.supportedLanguages.hasOwnProperty(i)) {
                angular.element('body').removeClass(langClassPrefix + i18n.supportedLanguages[i]);
            }
        }
        angular.element('body').addClass(langClassPrefix + lang);
    };

    $scope.languages = i18n.getSupportedLanguages();

    $scope.getCurrentLanguage = function() {
        return i18n.getCurrentLanguage();
    };

    $scope.setCurrentLanguage = function(lang) {
        i18n.setCurrentLanguage(lang);
        $scope.setBodyLanguageClass(lang);
    };

    $scope.setBodyLanguageClass($scope.getCurrentLanguage());
}]);
