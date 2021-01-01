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


function Navigation() {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [showLoginForm, setShowLoginFrom] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [showSpotForm, setShowSpotForm] = useState(false);

  useEffect(() => {
    switch (location.pathname) {
      case '/login':
        setShowLoginFrom(true);
        setShowSignupForm(false);
        setShowSpotForm(false);
        break;
      case '/signup':
        setShowLoginFrom(false);
        setShowSignupForm(true);
        setShowSpotForm(false);
        break;
      case '/spots/create':
        setShowLoginFrom(false);
        setShowSignupForm(false);
        setShowSpotForm(true);
        break;
      default:
        setShowLoginFrom(false);
        setShowSignupForm(false);
        setShowSpotForm(false);
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
      {showLoginForm && <LoginFormModal />}
      {showSignupForm && <SignupFormModal />}
      {showSpotForm && <SpotFormModal />}
    </div>
  )
}

export default Navigation;