import { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProfileButton from './ProfileButton';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);
  const [showMenu, setShowMenu] = useState(false);
  const dropdownMenuRef = useRef(null);

  function DropdownMenu() {
    return (<div className="dropdown-menu hidden" ref={dropdownMenuRef} >
      <div className="dropdown-menu-item">{sessionUser.username}</div>
      <hr className="hr" />
      <div className="dropdown-menu-item">{sessionUser.email}</div>
      <hr className="hr" />
      <div className="dropdown-menu-item">
        <button className="button button-Reset">Logout</button>
      </div>
    </div>);
  }

  useEffect(() => {
    if (showMenu) {
      dropdownMenuRef.current.classList.remove("hidden");
      dropdownMenuRef.current.classList.add("shown")
    }
  }, [showMenu])
  return (
    <nav>
      <NavLink to="/ ">Home</NavLink>
      { sessionUser ?
        <>
          <span onClick={() => {
            setShowMenu(!showMenu);
          }}>
            <ProfileButton />
          </span>
          <DropdownMenu />
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