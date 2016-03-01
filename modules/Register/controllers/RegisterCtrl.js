angular.module('#Register').controller('RegisterCtrl', ['$scope', 'User', 'i18n', 'Auth', '$window', function ($scope, User, i18n, Auth, $window) {
    
    Auth.isMaintenance(function (code, data) {
        if(code === 200 && data.isMaintenance === true)
            window.location.reload();
        },function (code, data) {
    });
    
    $scope.user = {
        firstname : '',
        lastname : '',
        email : '',
        password : '',
        retypePassword : '',
        gender : 'male',
        salutation : 'Mr',
        newsletterFlag : false,
        language : '',
        // Get default language based on app language.
        country : User.languageToCountryMap[i18n.currentLanguage]
    };

    // List of countries that can be selected.
    $scope.countryList = [];

    $scope.captcha = {
        challenge : '',
        response : ''
    };
    
    $scope.img_src = '';

    $scope.passDoesntContainFirstName = true;
    $scope.passDoesntContainSurname = true;
    $scope.passDoesntContainNumber = true;
    $scope.passDoesntContainSymbol = true;
    $scope.score = 0;
    $scope.strengthMetterClass = 'strength0';
    $scope.emailPattern = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$";
    $scope.strengthDesc = 'label_password_not_entered';

    $scope.passwordsMatch = false;

    // Tests password for containing firstname or surname.
    var nameInPasswordTest = function () {

        var firstnameRegExp = new RegExp($scope.user.firstname, 'i');
        $scope.passDoesntContainFirstName = !firstnameRegExp.test($scope.user.password);

        var surnameRegExp = new RegExp($scope.user.lastname, 'i');
        $scope.passDoesntContainSurname = !surnameRegExp.test($scope.user.password);
    };

    // Checks if password and retype password are matching.
    var arePasswordsMatching = function () {
        $scope.passwordsMatch = $scope.user.password === $scope.user.retypePassword;
    };

    // Tests password for containing an UpperCase letter
    $scope.passDoesntContainUpperCase = function () {
        return !$scope.user.password.match(/[A-Z]/);
    };

    // Tests password for containing an LowerCase letter
    $scope.passDoesntContainLowerCase = function () {
        return !$scope.user.password.match(/[a-z]/);
    };

    // Set gender based on salutation
    var setGenderBasedOnSalutation = function () {

        var salutationGenderMap = {
            'Mr' : 'male',
            'Ms' : 'female'
        };

        $scope.user.gender = salutationGenderMap[$scope.user.salutation];
    };

    $scope.$watch('user.password', nameInPasswordTest);
    $scope.$watch('user.firstname', nameInPasswordTest);
    $scope.$watch('user.lastname', nameInPasswordTest);
    $scope.$watch('user.password', arePasswordsMatching);
    $scope.$watch('user.retypePassword', arePasswordsMatching);
    $scope.$watch('user.salutation', setGenderBasedOnSalutation);

    /**
     Calculates the password strength based on given rules. It is called on changed password
     input field event.

     @method passStrength
    **/
    $scope.passStrength = function () {
        var desc = [];

        desc[0] = 'label_very_weak';
        desc[1] = 'label_weak';
        desc[2] = 'label_better';
        desc[3] = 'label_medium';
        desc[4] = 'label_strong';
        desc[5] = 'label_strongest';

        $scope.score = 0;

        if (typeof $scope.user.password === 'undefined') {
            $scope.user.password = "";
        }

        // if $scope.password.bigger than 8 give 1 point
        if ($scope.user.password.length > 7) {
            $scope.score += 1;
        }

        // if $scope.password.has both lower and uppercase characters give 1
        // point
        if (($scope.user.password.match(/[a-z]/)) && ($scope.user.password.match(/[A-Z]/))){
            $scope.score += 1;
        }

        // if $scope.password.has at least one number give 1 point
        if ($scope.user.password.match(/\d+/)) {
            $scope.score += 1;
            $scope.passDoesntContainNumber = false;
        } else {
            $scope.passDoesntContainNumber = true;
        }

        // if $scope.password.has at least one special caracther give 1 point
        if ($scope.user.password.match(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/)) {
            $scope.score += 1;
            $scope.passDoesntContainSymbol = false;
        } else {
            $scope.passDoesntContainSymbol = true;
        }

        // if $scope.password.bigger than 12 give another 1 point
        if ($scope.user.password.length > 12) {
            $scope.score += 1;
        }

        $scope.strengthDesc = desc[$scope.score];
        $scope.strengthMetterClass = 'strength' + $scope.score;
    };

    $scope.loadCaptcha = function () {
        User.getCaptcha().then(function (data) {
            $scope.captcha.challenge = data.id;
            $scope.img_src = "data:image/png;base64," + data.image;
        }, function () {
            // TODO: error message for failed to load captcha.
        });
    };

    $scope.loadCaptcha();
    
    $scope.getCountryList = function () {
        User.getCountryList().then(function (data) {
            $scope.countryList = data.countries;
        }, function () {});
    };

    $scope.getCountryList();
    
    /**
     Handles submit button click event and calls proper userMgmtService methods.

     @method submitClick
    **/
    $scope.submitClick = function () {
        
        Auth.isMaintenance(function (code, data) {
            if(code === 200 && data.isMaintenance === true)
                $window.location.reload();
            },function (code, data) {
        });

        $scope.user.language = i18n.getCurrentLanguage();

        User.register($scope.user, $scope.captcha, function (code, data) {

            $scope.label('label_dialog_title');
            $scope.label('label_user_registration_success');

            $scope.$apply();

        }, function (code, data) {

            var responsedata = angular.fromJson(data);

            $scope.label('label_error');
            $scope.label('label_' + responsedata.code);
            
            $scope.loadCaptcha(); // Reload Captcha.
            $scope.$apply();
        });
    };

    // Disable enter key in registration form to prevent submit on enter.
    angular.element(document).ready(function() {
      angular.element(window).keydown(function(event){
        if(event.keyCode === 13) {
          event.preventDefault();
          return false;
        }
      });
    });

}]);

/*
 https://stg-my.gigatest.eu/#/de/confirmRegistration/activationCode/71e3512299
 */