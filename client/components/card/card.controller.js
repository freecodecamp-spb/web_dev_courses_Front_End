webCourses.controller('cardCtrl', function($scope, $http) {
    $scope.showcards = false;
    $scope.courseList = [];
    // Запрос массива курсов при загрузке страницы
    // $scope.courseList держит JSON всех курсов
    $http.get('/courses/get')
        .success(function(courseList) {
            $scope.courseList = courseList;
        })
        .error(function(courseList) {
            console.log('Error: ' + courseList);
        });

});
