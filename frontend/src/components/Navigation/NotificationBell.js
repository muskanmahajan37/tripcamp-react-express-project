import React,{ useRef } from 'react';
import { useDispatch } from 'react-redux';

export default function NotificationBell({ user }) {
  const dispatch = useDispatch();

  const dropdownMenuRef = useRef(null);

  function DropdownMenu() {
    return (
      <div className=" dropdown-menu" ref={dropdownMenuRef}>
        <div className="dropdown-menu-item">{user.username}</div>
        <hr className="hr" />
        <div className="dropdown-menu-item">{user.email}</div>
      </div>
    );
  }
  return (
    <>
      <span
        className="dropdown-menu-parent"
      >
        <button 
          className="fa fa-bell icon-span" 
          style={{marginLeft: '15px'}}
        />
        {
          <DropdownMenu />
        }
      </span>
      <span 
        id="notification-number"
        className='notification-badge'
      >9</span>
    </>
  );
}
