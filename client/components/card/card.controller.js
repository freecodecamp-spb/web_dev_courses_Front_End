webCourses.controller('cardCtrl', function($scope) {
    // ЗАГЛУШКА ДЛЯ ГЕНЕРАЦИИ КУРСОВ
    $scope.coursesArray = [
        {
            "name": "Javascript for dummies",
            "desc": "Entry-level tutorials for Front-End Javascript",
            "picture": "images/development-bg.png",
            "tags": ['javascript']
        }, {
            "name": "Beginner CSS",
            "desc": "CSS From Zero to Hero",
            "picture": "images/development-bg.png",
            "tags": ['css']
        }, {
            "name": "HTML5 Fundamentals",
            "desc": "Learn about modern HTML",
            "picture": "images/development-bg.png",
            "tags": ['html']
        }, {
            "name": "Django for Perverts",
            "desc": "How to set up a simple server in Python",
            "picture": "images/development-bg.png",
            "tags": ['django', 'python']
        }, {
            "name": 'Javascript for Dummies',
            "desc": 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum obcaecati pariatur provident praesentium atque consequatur qui quam ut nostrum minima iusto animi eligendi quaerat.',
            "tags": ['javascript']
        }, {
            "name": 'Front-End Bootcamp',
            "desc": 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum obcaecati pariatur provident praesentium atque consequatur qui quam ut nostrum minima iusto animi eligendi quaerat.',
            "picture": "images/development-bg.png",
            "tags": ['javascript']
        }, {
            "name": 'The CSS 3 styling guides',
            "desc": 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum obcaecati pariatur provident praesentium atque consequatur qui quam ut nostrum minima iusto animi eligendi quaerat.',
            "picture": "images/development-bg.png",
            "tags": ['css']
        }, {
            "name": 'SVG intercourse',
            "desc": 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum obcaecati pariatur provident praesentium atque consequatur qui quam ut nostrum minima iusto animi eligendi quaerat.',
            "picture": "images/development-bg.png",
            "tags": ['webdesign']
        }, {
            "name": 'HTML5: what\'s new',
            "desc": 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum obcaecati pariatur provident praesentium atque consequatur qui quam ut nostrum minima iusto animi eligendi quaerat.',
            "picture": "images/development-bg.png",
            "tags": ['webdesign', 'HTML']
        }
    ];
});
