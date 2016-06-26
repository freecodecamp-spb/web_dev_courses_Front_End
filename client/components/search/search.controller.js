webCourses.controller('search', function($scope, $http) {

    var defaultFilter = 'all';
    var apiUrl = '/courses/search/';
    var coursesPageLimit = 10;

    $scope.filter = defaultFilter;
    $scope.api_url = apiUrl;

    $scope.findCourses = function(searchUrl) {
        $http
            .get(searchUrl)
            .success(function(courseList) {
                $scope.results = courseList;
            })
            .error(function(courseList) {
                console.log('Error: ' + courseList);
            });
    };

    $scope.onSubmit = function(e) {
        e.preventDefault();
        let searchUrl = apiUrl + 'tags=' + $scope.filter;
        $scope.findCourses(searchUrl);
    };

    $scope.onTagChange = function() {
        var search_tags = $scope.search_tags;
        var filter = [];

        // TODO make it simpler
        Object.keys(search_tags)
            .forEach(function(tag) {
                if (search_tags[tag]) {
                    filter.push(tag);
                }
            });

        $scope.filter = filter.join(',') || defaultFilter;
    };

    // on page load
    $scope.findCourses(apiUrl + 'limit=' + coursesPageLimit);
});
