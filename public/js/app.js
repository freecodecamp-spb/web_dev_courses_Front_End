var userList = angular.module('userList', [])
    .controller('userCtrl', function($scope, $http) {
        $scope.userlist = [];
        $http.get('/users/get')
            .success(function(userlist) {
                $scope.userlist = userlist;
            })
            .error(function(userlist) {
                console.log('error occured: ' + userlist);
            })
    })
    .directive('profile', function() {
        return {
            templateUrl: 'templates/profile.html'
        }
    });
