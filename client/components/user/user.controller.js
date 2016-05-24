webCourses.controller('userCtrl', function($scope, $http) {
    $scope.userlist = [];
    $http.get('/users/get')
        .success(function(userlist) {
            $scope.userlist = userlist;
        })
        .error(function(userlist) {
            console.log('error' + userlist);
        })
});
