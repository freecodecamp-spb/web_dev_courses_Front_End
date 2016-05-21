var webCourses = angular.module('webCourses', []);

webCourses.controller('userCtrl', function($scope, $http) {
    $scope.userlist = [];

    $http.get('/users/get').success(function(userlist) {
        $scope.userlist = userlist;
    }).error(function(userlist) {
        console.log('error' + userlist);
    });
});

webCourses.controller('cardCtrl', function($scope) {
    // ЗАГЛУШКА ДЛЯ ГЕНЕРАЦИИ КУРСОВ
    $scope.showcards = false;

    $scope.coursesArray = [
        {
            "name": "Javascript for dummies",
            "desc": "Entry-level tutorials for Front-End Javascript",
            "picture": "images/development-bg.png",
            "tags": ['javascript'],
            "rating": 7.8
        }, {
            "name": "Beginner CSS",
            "desc": "CSS From Zero to Hero",
            "picture": "images/development-bg.png",
            "tags": ['css'],
            "rating": 8.1
        }, {
            "name": "HTML5 Fundamentals",
            "desc": "Learn about modern HTML",
            "picture": "images/development-bg.png",
            "tags": ['html'],
            "rating": 6.0
        }, {
            "name": "Django for Perverts",
            "desc": "How to set up a simple server in Python",
            "picture": "images/development-bg.png",
            "tags": ['django', 'python'],
            "rating": 8.3
        }, {
            "name": 'Javascript for Dummies',
            "desc": 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum obcaecati pariatur provident praesentium atque consequatur qui quam ut nostrum minima iusto animi eligendi quaerat.',
            "tags": ['javascript'],
            "rating": 6.4
        }, {
            "name": 'Front-End Bootcamp',
            "desc": 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum obcaecati pariatur provident praesentium atque consequatur qui quam ut nostrum minima iusto animi eligendi quaerat.',
            "picture": "images/development-bg.png",
            "tags": ['javascript'],
            "rating": 7.1
        }, {
            "name": 'The CSS 3 styling guides',
            "desc": 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum obcaecati pariatur provident praesentium atque consequatur qui quam ut nostrum minima iusto animi eligendi quaerat.',
            "picture": "images/development-bg.png",
            "tags": ['css'],
            "rating": 5.9
        }, {
            "name": 'SVG intercourse',
            "desc": 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum obcaecati pariatur provident praesentium atque consequatur qui quam ut nostrum minima iusto animi eligendi quaerat.',
            "picture": "images/development-bg.png",
            "tags": ['webdesign'],
            "rating": 6.8
        }, {
            "name": 'HTML5: what\'s new',
            "desc": 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum obcaecati pariatur provident praesentium atque consequatur qui quam ut nostrum minima iusto animi eligendi quaerat.',
            "picture": "images/development-bg.png",
            "tags": ['webdesign', 'HTML'],
            "rating": 8.1
        }
    ];
});


// =======================================
// КАСТОМНЫЕ ДИРЕКТИВЫ. ДОБАВЛЯЙТЕ СЮДА
webCourses.directive('card', function() {
    // Большая карточка курса
    return {
        templateUrl: 'templates/card.html'
    }
});

webCourses.directive('profile', function() {
    // Список пользователей
    return {
        templateUrl: 'templates/profile.html'
    }
});
