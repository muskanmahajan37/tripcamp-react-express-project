import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import * as relationshipActions from '../../store/relationship';
import * as messageActions from '../../store/message';
import * as bookingActions from '../../store/booking';


export default function NotificationBell() {
  const sessionUser = useSelector(state => state.session.user);
  const relationships = useSelector(state => state.relationships);
  const messages = useSelector(state => state.messages);
  const bookings = useSelector(state => state.bookings);
  const [numberOfNotes, setNumberOfNotes] = useState(0);
  const [numOfReqs, setNumOfReqs] = useState(0);
  const [numOfMsgs, setNumOfMsgs] = useState(0);
  const [numOfBks, setNumOfBks] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!sessionUser) return;
    if (!relationships.all) {
      dispatch(relationshipActions.getAllRelationships(sessionUser.id))
        .then(res => { })
        .catch(e => { });
    }
    dispatch(messageActions.getAllMessages())
      .then(res => { })
      .catch(e => { });
    if (!bookings.length) {
      dispatch(bookingActions.getAllBookings())
        .then(res => { })
        .catch(e => { });
    }
  }, [sessionUser]);


  useEffect(() => {
    if (relationships.theirRequests) setNumOfReqs(relationships.theirRequests.length);
    setNumOfMsgs(messages.filter(m => m.status === 0).length);
    setNumOfBks(bookings.length);
  }, [relationships.theirRequests, messages, bookings]);

  useEffect(() => {
    setNumberOfNotes(numOfBks + numOfMsgs + numOfReqs);
  }, [numOfBks, numOfMsgs, numOfReqs])

  const dropdownMenuRef = useRef(null);

  function DropdownMenu() {
    return (
      <div className=" dropdown-menu"
        style={{ minWidth: '165px' }}
        ref={dropdownMenuRef}>
        <div className="dropdown-menu-item">
          <Link
            to='/myhome'>
            {numOfReqs} friend requests
          </Link>
        </div>
        <hr className="hr" />
        <div className="dropdown-menu-item">
          <Link
            to='/myhome'>
            {numOfMsgs} unread messages
          </Link>
        </div>
        <hr className="hr" />
        <div className="dropdown-menu-item">
          <Link
            to='/myhome'>
            {numOfBks} confirmed trips
          </Link>
        </div>
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
          style={{ marginLeft: '15px' }}
        />
        {
          <DropdownMenu />
        }
      </span>
      <span
        id="notification-number"
        className='notification-badge'
      >{numberOfNotes}</span>
    </>
  );
}
