import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from './store';
import { setCurrentUser } from './actions/auth';

import TasksPage from './components/TasksPage/TasksPage';
import AuthPage from './components/AuthPage/AuthPage';

if (localStorage.token) {
  store.dispatch(setCurrentUser(localStorage.token));
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Route exact path="/" component={TasksPage} />
          <Route exact path="/signin" component={AuthPage} />
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
