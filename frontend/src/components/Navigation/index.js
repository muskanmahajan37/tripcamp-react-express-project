import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProfileButton from './ProfileButton';
import NotificationBell from './NotificationBell';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav>
      <NavLink to={'/'}>Home</NavLink>
      { sessionUser ?
        <>
        <NotificationBell user={sessionUser}/>
        <ProfileButton user={sessionUser}/>
        </>
        :
        <>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Signup</NavLink>
        </>
      }
    </nav>
  )
}

export default Navigation;