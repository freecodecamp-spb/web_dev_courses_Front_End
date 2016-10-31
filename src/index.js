import React from 'react';
import ReactDOM from 'react-dom';

import {
  Router,
  Route,
  IndexRedirect,
  browserHistory
} from 'react-router';

import './index.css';

import App from './App';
import { AuthPage } from './pages/auth/auth';

import { CoursesListPage } from './pages/courses-list/couses-list';
import { CoursesItemPage } from './pages/courses-item/courses-item';
import { CoursesNewPage } from './pages/courses-new/courses-new';

ReactDOM.render((
    <Router history={browserHistory}>
      <Route path="/" component={App}>

        <IndexRedirect to="/courses/" />

        <Route path="/courses" component={CoursesListPage} />
        <Route path="/courses/new" component={CoursesNewPage}/>
        <Route path="/courses/:id" component={CoursesItemPage}/>
      
      </Route>
    </Router>
  ), document.getElementById('root')
);
