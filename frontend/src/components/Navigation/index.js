import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

import ProfileButton from './ProfileButton';
import NotificationBell from './NotificationBell';
import GithubLink from './GithubLink';
import { removeCurrentSpot } from '../../store/spot';
import { LoginFormModal } from '../LoginFormPage';
import { SignupFormModal } from '../SignupFormPage';
import { SpotFormModal } from '../Spot';
import { AddFriendsModal } from '../AddFriends';
import BookingFormModal from '../BookingForm';
import ReviewFormModal from '../ReviewForm';

import './Navigation.css';


function Navigation() {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [showForms, setShowForms] = useState(new Array(6).fill(false));

  const Forms = [
    <LoginFormModal />,
    <SignupFormModal />,
    <SpotFormModal />,
    <AddFriendsModal />,
    <BookingFormModal />,
    <ReviewFormModal />
  ];

  useEffect(() => {
    let path = location.pathname;
    const id = path.slice(path.lastIndexOf('/') + 1);
    if (Number(id)) {
      path = path.slice(0, path.lastIndexOf('/') + 1);
    }
    switch (path) {
      case '/login':
        setShowForms([true, false, false, false, false, false]);
        break;
      case '/signup':
        setShowForms([false, true, false, false, false, false]);
        break;
      case '/spots/create':
        setShowForms([false, false, true, false, false, false]);
        break;
      case '/users/addfriend':
        setShowForms([false, false, false, true, false, false]);
        break;
      case '/bookings/spots/':
        setShowForms([false, false, false, false, true, false]);
        break;
      case '/reviews/spots/':
        setShowForms([false, false, false, false, false, true]);
        break;
      default:
        setShowForms([false, false, false, false, false, false]);
        break;
    }
  }, [location.pathname])

  return (
    <div>
      <nav className="main-navbar">
        <img
          className='logo-img'
          // src='https://tripcamp.s3.amazonaws.com/resources/images/official/logos/tripcamp3_200x60.png'
          // src='https://tripcamp.s3.amazonaws.com/resources/images/official/logos/tripcamp5-200x60.png'
          src='https://tripcamp.s3.amazonaws.com/resources/images/official/logos/tripcamp6-200x60.png'
          alt='TripCamp Logo'
          onClick={e=>{e.preventDefault(); history.push('/')}}
        />
        <div>
          <NavLink to={'/'} onClick={e => {
            e.preventDefault();
            dispatch(removeCurrentSpot());
            history.push('/');
          }}>
            Home
        </NavLink>
          <NavLink to={'/allspots'} onClick={e => {
            e.preventDefault();
            dispatch(removeCurrentSpot());
            history.push('/allspots');
          }}>
            Spots
        </NavLink>
          {sessionUser ?
            <>
              <NotificationBell user={sessionUser} />
              <ProfileButton user={sessionUser} />
            </>
            :
            <>
              <NavLink to="/login">Log in</NavLink>
              <NavLink to="/signup">Sign up</NavLink>
              <GithubLink />
            </>
          }
        </div>
      </nav>
      {showForms.map((show, i) => show && Forms[i])}
    </div>
  )
}

export default Navigation;