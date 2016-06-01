webCourses.controller('search', function($scope, $http) {

    var defaultFilter = 'all';

    $scope.filter = defaultFilter;

    $scope.tags = [
        'js',
        'css',
        'html'
    ];
    
    $scope.search = {
        tags: $scope.tags
    };
    
    $scope.onSubmit = function(e) {
        e.preventDefault();
        console.log("e: ", e);
        console.log("$scope.filter: ", $scope.filter);
        console.log("$scope.search_tags: ", $scope.search_tags);
    };
});
