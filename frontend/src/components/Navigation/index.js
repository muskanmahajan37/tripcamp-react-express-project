import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import ProfileButton from './ProfileButton';
import NotificationBell from './NotificationBell';
import GithubLink from './GithubLink';
import { removeCurrentSpot } from '../../store/spot';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <nav className="main-navbar">
      <NavLink to={'/'} onClick={e => {
        e.preventDefault();
        dispatch(removeCurrentSpot());
        console.log('removeCurrentSpot');
        history.push('/');
      }}>
        Home
      </NavLink>
      { sessionUser ?
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
  )
}

export default Navigation;