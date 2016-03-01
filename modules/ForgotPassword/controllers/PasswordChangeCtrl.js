angular.module('#ForgotPassword').controller('PasswordChangeCtrl', ['$scope', 'User', '$routeParams', '$window', function($scope, User, $routeParams, $window){
        
    $scope.userEmail = $routeParams.email;
    $scope.oldpassword = $routeParams.password;
    $scope.strengthDesc = 'label_password_not_entered';
    $scope.score = 0;
    $scope.strengthMetterClass = 'strength0';
    $scope.password = '';

//  see if our window is active
    $window.isActive = true;
    $(window).focus(function () {
        this.isActive = true;
    });
    $(window).blur(function () {
        this.isActive = false;
    });      
    
    /**
     * Checks if password restrictions are not met.
     *
     * @method conditionsDidNotMet
     */
    $scope.conditionsDidNotMet = function () {
        if ($scope.password !== $scope.retypePassword || $scope.score <= 3) {
            return true;
        } else {
            return false;
        }
    };

    /**
     * Handles submit button click event and calls proper userMgmtService methods.
     *
     * @method submitClick
     */
    $scope.submitClick = function () {
        User.newPassword($scope.userEmail, $scope.oldpassword, $scope.password, $scope.retypePassword, function () {


        }, function (data) {
            
        });
    };

    $scope.passDoesntContainNumber = true;
    $scope.passDoesntContainSymbol = true;

    // Tests password for containing an UpperCase letter
    $scope.passDoesntContainUpperCase = function () {
        return !$scope.password.match(/[A-Z]/);
    };

    // Tests password for containing an LowerCase letter
    $scope.passDoesntContainLowerCase = function () {
        return !$scope.password.match(/[a-z]/);
    };

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

        if (typeof $scope.password === 'undefined') {
            $scope.password = "";
        }

        //if $scope.password.bigger than 6 give 1 point
        if ($scope.password.length > 7) {
            $scope.score++;
        }

        //if $scope.password.has both lower and uppercase characters give 1 point
        if (($scope.password.match(/[a-z]/)) && ($scope.password.match(/[A-Z]/))) {
            $scope.score++;
        }

        //if $scope.password.has at least one number give 1 point
        if ($scope.password.match(/\d+/)) {
            $scope.score++;
            $scope.passDoesntContainNumber = false;
        } else {
            $scope.passDoesntContainNumber = true;
        }

        //if $scope.password.has at least one special caracther give 1 point
        if ($scope.password.match(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/)) {
            $scope.score++;
            $scope.passDoesntContainSymbol = false;
        } else {
            $scope.passDoesntContainSymbol = true;
        }

        //if $scope.password.bigger than 12 give another 1 point
        if ($scope.password.length > 12) {
            $scope.score++;
        }

        $scope.strengthDesc = desc[$scope.score];
        $scope.strengthMetterClass = 'strength' + $scope.score;
    };
    
}]);