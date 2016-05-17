console.log("iniut");
var userList = angular.module('userList', []);
userList.controller('userCtrl', function($scope, $http) {
    $scope.userlist = [];
    $http.get('/users/get')
        .success(function(userlist) {
            $scope.userlist = userlist;
            console.log("cool");
            console.log($scope.userlist[0].github.name);
        })
        .error(function(userlist) {
            console.log('error' + userlist);
        })
});
userList.directive('profile', function() {
    return {
        templateUrl: 'templates/profile.html'
    }
})
