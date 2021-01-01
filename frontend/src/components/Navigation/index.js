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
    console.log(path, id, Number(id));
    if(Number(id)) {
      path = path.slice(0, path.lastIndexOf('/') + 1);
      console.log("Great, it's a number", Number(id), path);
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
        <NavLink to={'/'} onClick={e => {
          e.preventDefault();
          dispatch(removeCurrentSpot());
          console.log('removeCurrentSpot');
          history.push('/');
        }}>
          Home
      </NavLink>
        {sessionUser ?
          <>
            <NotificationBell user={sessionUser} />
            <ProfileButton user={sessionUser} />
          </>
          :
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Signup</NavLink>
            <GithubLink />
          </>
        }
      </nav>
      {showForms.map((show, i) => show && Forms[i])}
    </div>
  )
}

export default Navigation;