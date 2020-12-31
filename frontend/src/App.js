import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { LoginFormModal } from './components/LoginFormPage';
import { SignupFormModal } from './components/SignupFormPage';
import Spot, { SpotFormModal } from './components/Spot';
import BookingFormModal from './components/BookingForm';
import ReviewFormModal from './components/ReviewForm';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Footer from './components/Footer';

import * as sessionActions from "./store/session";
import * as spotActions from './store/spot';
// import * as bookingActions from './store/booking';

// import MainSearchBar from './components/Search';


function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  console.log(sessionUser);

  useEffect(() => {
    const withReviews = true;
    dispatch(spotActions.getAllSpots(withReviews));
  }, [dispatch]);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <div className='mainbody'>
      <Navigation />
      {/* <MainSearchBar /> */}
      <Home />
      <Switch>
        <Route path='/login'>
          <LoginFormModal />
        </Route>
        <Route path='/signup'>
          <SignupFormModal />
        </Route>
        <Route exact path='/spots/create'>
          <SpotFormModal />
        </Route>
        <Route path='/spots/:spotId' >
          <Spot />
        </Route>
        <Route path='/bookings/spots/:spotId'>
          <BookingFormModal />
        </Route>
        <Route path='/reviews/spots/:spotId'>
          <ReviewFormModal />
        </Route>
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
