var webCourses = angular.module('webCourses', []);
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

webCourses.controller('cardCtrl', function($scope) {
    // ЗАГЛУШКА ДЛЯ ГЕНЕРАЦИИ КУРСОВ
    $scope.coursesArray = [{
        "name": "Javascript for dummies",
        "desc": "Entry-level tutorials for Front-End Javascript",
        "picture": "images/development-bg.png"
    }, {
        "name": "Beginner CSS",
        "desc": "CSS From Zero to Hero",
        "picture": "images/development-bg.png"
    }, {
        "name": "HTML5 Fundamentals",
        "desc": "Learn about modern HTML",
        "picture": "images/development-bg.png"
    }, {
        "name": "Django for Perverts",
        "desc": "How to set up a simple server in Python",
        "picture": "images/development-bg.png"
    }];
});


// =======================================
// КАСТОМНЫЕ ДИРЕКТИВЫ. ДОБАВЛЯЙТЕ СЮДА
webCourses.directive('card', function() {
    // Большая карточка курса
    return {
        templateUrl: 'templates/card.html'
    }
})
webCourses.directive('profile', function() {
    // Список пользователей
    return {
        templateUrl: 'templates/profile.html'
    }
})
