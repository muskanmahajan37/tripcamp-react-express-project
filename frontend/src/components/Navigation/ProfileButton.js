import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as sessionActions from '../../store/session';

export default function ProfileButton({ user }) {
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const dropdownMenuRef = useRef(null);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };
  const createSpot = e => {
    e.preventDefault();
    // dropdownMenuRef.current.style = "visibility: hidden;";
    history.push('/spots/create');
  }

  function DropdownMenu() {
    return (
      <div className="dropdown-menu" ref={dropdownMenuRef}>
        <div className="dropdown-menu-item">{user.username}</div>
        <hr className="hr" />
        <div className="dropdown-menu-item">{user.email}</div>
        <hr className="hr" />
        <div className="dropdown-menu-item">
          <button
            className="button button-Send"
            onClick={createSpot}
          >
            Create Spot
          </button>
        </div>
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
    <>
      <span
        className="dropdown-menu-parent"
        style={{ marginRight: '20px' }}
      // onClick={() => { setShowMenu(!showMenu); }}
      // onMouseOver={() => { setShowMenu(true); }}
      // onMouseOut={() => { setShowMenu(false); }}
      // onMouseLeave={() =>  setTimeout(() => setShowMenu(false), 1000) }
      >
        <button
          className="fas fa-atom icon-span"
          style={{ marginRight: '20px' }}
        />
        {
          // showMenu &&
          <DropdownMenu />
        }
      </span>
    </>
  );
}