import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import * as sessionActions from '../../store/session';

export default function ProfileButton({ user }) {
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();

  const dropdownMenuRef = useRef(null);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  function DropdownMenu() {
    return (
      <div className=" dropdown-menu" ref={dropdownMenuRef}>
        <div className="dropdown-menu-item">{user.username}</div>
        <hr className="hr" />
        <div className="dropdown-menu-item">{user.email}</div>
        <hr className="hr" />
        <div className="dropdown-menu-item">
          <button
            className="button button-Reset"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    );
  }
  function dropdownShowHide() {
    // if (showMenu) {
    //   dropdownMenuRef.current.classList.remove("hidden");
    //   dropdownMenuRef.current.classList.add("shown")
    // }
    // else {
    //   dropdownMenuRef.current.classList.remove("shown");
    //   dropdownMenuRef.current.classList.add("hidden")
    // }
  }

  useEffect(() => {
    if (!showMenu) return;
    dropdownShowHide();
    const closeMenu = (e) => {
      if (!e.target.className.includes("dropdown-menu"))
        setShowMenu(false);
    };
    document.addEventListener('click', closeMenu);
    // document.addEventListener('mouseover', closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu])

  return (
    <button
      className="fas fa-atom icon-span dropdown-menu-parent"
      // onClick={() => { setShowMenu(!showMenu); }}
      // onMouseOver={() => { setShowMenu(true); }}
      // onMouseOut={() => { setShowMenu(false); }}
      // onMouseLeave={() =>  setTimeout(() => setShowMenu(false), 1000) }
    >
      {
        // showMenu &&
        <DropdownMenu />
      }
    </button>
  );
}