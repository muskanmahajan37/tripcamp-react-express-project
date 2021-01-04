import React,{ useRef } from 'react';
import { useDispatch } from 'react-redux';

export default function NotificationBell({ user }) {
  const dispatch = useDispatch();

  const dropdownMenuRef = useRef(null);

  function DropdownMenu() {
    return (
      <div className=" dropdown-menu" ref={dropdownMenuRef}>
        <div className="dropdown-menu-item">{2} friend requests</div>
        <hr className="hr" />
        <div className="dropdown-menu-item">{3} unread messages</div>
        <hr className="hr" />
        <div className="dropdown-menu-item">{4} confirmed trips</div>
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
