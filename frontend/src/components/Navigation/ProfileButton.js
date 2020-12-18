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
      <div className="dropdown-menu hidden" ref={dropdownMenuRef}>
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
    if (showMenu) {
      dropdownMenuRef.current.classList.remove("hidden");
      dropdownMenuRef.current.classList.add("shown")
    }
    // else {
    //   dropdownMenuRef.current.classList.remove("shown");
    //   dropdownMenuRef.current.classList.add("hidden")
    // }
  }

  useEffect(() => {
    dropdownShowHide();
  }, [showMenu])

  return (
    <span
      className="fas fa-atom"
      onClick={() => {
        setShowMenu(!showMenu);
      }}
    >
      <DropdownMenu />
    </span>
  );
}