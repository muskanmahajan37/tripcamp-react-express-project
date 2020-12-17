import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import * as sessionActions from "./store/session";;

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  console.log(sessionUser);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(()=>setIsLoaded(true));
  },[dispatch]);

  return isLoaded && (
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
      <Route exact path='/signup'>
        <SignupFormPage />
      </Route>
    </Switch>
  );
}

export default App;
