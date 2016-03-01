angular.module('Auth').controller('RedirectCtrl', ['$location', '$cookies', function ($location, $cookies) {
        
    var loggedIn = $cookies.get('ssid');
    if(loggedIn !== undefined) {
        $location.path('/');
    } else {
        $location.path('/unauthorized');
    }
    
}]);