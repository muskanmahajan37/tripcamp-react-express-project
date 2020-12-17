import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import LoginFormPage from './components/LoginFormPage';
import { restoreUser } from './store/session';

function App() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  console.log(sessionUser);

  useEffect(() => {
    dispatch(restoreUser());
  },[dispatch]);

  return (
    <Switch>
      <Route exact path='/'>
        <p>Home</p>
        {
          sessionUser ?
            <button className="button button-Reset">Logout</button>
            :
            <Redirect to='/login' />
        }
      </Route>
      <Route exact path='/login'>
        <LoginFormPage />
      </Route>
    </Switch>
  );
}

export default App;
