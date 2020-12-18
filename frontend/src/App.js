import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { LoginFormModal } from './components/LoginFormPage';
import { SignupFormModal } from './components/SignupFormPage';
import Navigation from './components/Navigation';

import * as sessionActions from "./store/session";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  console.log(sessionUser);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <div>
      <Navigation />
      <Switch>
        <Route exact path='/'>
          {/* {
            sessionUser ?
              <></>
              :
              <Redirect to='/login' />
          } */}
        </Route>
        <Route path='/login'>
          <LoginFormModal />
        </Route>
        <Route path='/signup'>
          <SignupFormModal />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
