# Как принести пользу проекту

## Культура
Всё делается по доброй воле людей, вовлеченных в процесс и увлеченных тем, что они делают.
Не забывайте, что здесь никто никому ничем не обязан.
Относитесь с уважением друг к другу вне зависимости от опыта, своего и чужого.

Увидели ошибку — создайте задачу в [issues](https://github.com/freecodecamp-spb/web-dev-courses/issues), а лучше — пришлите Pull request!

Было бы хорошо, чтоб каждый внёс хоть маленький кирпичик в то, ради чего все собрались.
Нам нужна помощь и в написании кода и в составлении документации, и в тестировании.
Будем рады любым предложениям, замечаниям и дополнениям!

## Как и где хранится код
Мы используем git и github.
Адрес репозитория проекта <https://github.com/freecodecamp-spb/web-dev-courses>.

Статья на [Хабре](https://habrahabr.ru/post/106912/), подробно описывающая принципы работы с Git, поняв которые вам будет значительно проще вливаться в проекты. 

[Краткое изложение](https://github.com/MistaTwista/git-flow-cheatsheet), которое можно повесить на стену и периодически подглядывать (статью всё же лучше прочитать). Стоит попробовать каждую из приведённых команд в консоли и посмотреть что будет.

## Как добавить задачу/сообщить об ошибке
Кратко опишите, что вы считает ошибкой, можете просто указать элемент и и что с ним не так, лучше всего в одном предложении (unclickable search button, awful color scheme).

Подробное руководство — [issue-guide](https://github.com/freecodecamp-spb/web-dev-courses/wiki/issue-guide).

* что произошло (как вы получили ошибку) — описание последовательности дейстий для воспроизведения
* что именно считается ошибкой и каково ожидаемое поведения
* доказательства того, что ошибка существует — скриншот, логи с текстом ошибки
* [optional] предложение, как исправить или исследование причины

## Как добавить код
Нужно сделать ветку на основе ветки `dev` (например: `feature/contribution-guide`),
добавить/поправить код, закомитить и отправить ветку на github.
Из этой ветки нужно сделать pull request в ветку `dev`. После того, как другой разработчик проверит код, его можно вливать —
`Merge pull request`.
О правилах названия коммитов и веток ниже.

## Как назвать коммит
Коммит — точка сохранения вашего кода. И стоит называть её понятно.
Ваш коллега хотел бы знать, что изменилось в коде в этом месте без необходимости смотреть код.
Уважайте ваших коллег. Не стоит называть коммит "Опечатка", "Правка опечатки", "Еще один косяк" и т.п.,
ведь не ясно, что именно изменилось и на что повлияло, а так же в какой момент времени код выполняет то, что должен.
Описывайте изменения/исправления кода более подробно.
Опишите, зачем были внесены изменения.

Именования коммитов разделяются на две сущности:

* название;
* описание (не обязательно).

Название — одно предложение, которое начинается с глагола и сообщает, что будет изменено в коде,
если принять коммит. Предпочтительный язык — английский.

![скриншот примера коммита в webstorm](https://monosnap.com/file/yxI54IFtQAVoppGm1tdXNKHKVJqEGf.png)

Примеры:

* Add contribution guide
* Добавить шаблон кнопки "Купить"
* Fix courses request handler error

Описание отбивается пустой строкой от названия. Состоит из нескольких предложений — что принесет код.
Если есть задача в [issues](https://github.com/freecodecamp-spb/web-dev-courses/issues), нужно указать ее номер вот так:
```
fixes #7
```
Где 7 — номер задачи https://github.com/freecodecamp-spb/web-dev-courses/issues/7, слово `fixes` означает, что коммит решает задачу.
Без слова `fixes` описание делается в случае, если коммит просто имеет отношение к задаче.

### Пример коммита в webstorm
![Скриншот коммита этого рукодства](https://monosnap.com/file/nSte0kZTU6xPpvXsOK8TDKCkWm2b4F.png)

Пример плохого названия коммита:

* Бомбануло
* Упс!
* Поправил код
* Мелкие правки
* Fixes

Такие названия ничего не говорят о коде и запутывают разработчиков. 
Не надо так :)!
Истинное творчество состоит в том, чтобы сложное сделать просто и очевидно.

## Как назвать ветку и сделать Pull request (PR)
Правило наименования веток:

* feature/%branch_name% — для кода, добавляющего функциональность;
* bugfix/%branch_name% — исправление существующего кода.

Где `%branch_name%` — два-три слова о коде, например: `contribution-guide`, `user-auth`, `list-template` и тд.

Когда вы закончили функционал, который разрабатывался в вашей локальной ветке вам нужно сделать Pull Request.
Это просьба влить ваши изменения в ветку разработки проекта над которым вы работали.
Ваш код проверят и если изменения не содержат ошибок, выполнят объединение (merge) с основной кодовой базой.
Оформляйте PR как можно более подробно.
Что изменится или поправится в результате объединения, что было исправлено вашим кодом или что будет улучшено и почему.

## Дополнительные материалы
- [How to Write a Git Commit Message](http://chris.beams.io/posts/git-commit/);
- [atom contribution guide](https://github.com/atom/atom/blob/master/CONTRIBUTING.md);
- [nodejs contribution guide](https://github.com/nodejs/node/blob/master/CONTRIBUTING.md).