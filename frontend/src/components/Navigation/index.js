import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProfileButton from './ProfileButton';
import NotificationBell from './NotificationBell';
import GithubLink from './GithubLink';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav className="main-navbar">
      <NavLink to={'/'}>Home</NavLink>
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