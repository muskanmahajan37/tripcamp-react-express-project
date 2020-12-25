import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { LoginFormModal } from './components/LoginFormPage';
import { SignupFormModal } from './components/SignupFormPage';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Footer from './components/Footer';

import * as sessionActions from "./store/session";
import * as spotActions from './store/spot';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  console.log(sessionUser);

  useEffect(() => {
    dispatch(spotActions.getAllSpots());
  }, [dispatch]);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <div className='mainbody'>
      <Navigation />
      <Home />
      <Switch>
        <Route exact path='/'>
        </Route>
        <Route path='/login'>
          <LoginFormModal />
        </Route>
        <Route path='/signup'>
          <SignupFormModal />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
