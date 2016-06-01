webCourses.controller('courses', function($scope, $http) {
    // ЗАГЛУШКА ДЛЯ ГЕНЕРАЦИИ КУРСОВ
    $scope.showcards = false;
    $scope.courseList = [];
    $scope.filter = 'all';
    
    $http.get('/courses/get')
        .success(function(courseList) {
            $scope.courseList = courseList;
        })
        .error(function(courseList) {
            console.log('Error: ' + courseList);
        });

});
