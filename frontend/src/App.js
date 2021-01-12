import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Spot from './components/Spot';
import Navigation from './components/Navigation';
import { Home as Spots, GlampHome } from './components/Home';
import Footer from './components/Footer';

import * as sessionActions from "./store/session";
import * as spotActions from './store/spot';
import MyHome from './components/Home/MyHome';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  // const sessionUser = useSelector(state => state.session.user);

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
      <Switch>
        <Route path='/spots/:spotId(\d+)' >
          <Spot />
        </Route>
        <Route path='/myHome'>
          <MyHome />
        </Route>
        <Route path="/(allspots|users/addfriend|spots/create|search|bookings/spots|reviews/spots)">
          <Spots />
        </Route>
        <Route exact path='/(login|signup|)' >
          <GlampHome />
        </Route>
        <Route >
          <div style={{height: '50%', marginTop: '10%'}}>
            <h4>404: page not found. Sorry!</h4>
          </div>
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
