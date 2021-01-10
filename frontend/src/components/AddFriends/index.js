// frontend/src/components/AddFriends/index.js

import { nanoid } from 'nanoid';
import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';

// import * as sessionActions from '../../store/session';
 import * as relationshipActions from '../../store/relationship';

import '../Forms.css';


export function AddFriendsModal() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [message, setMessage] = useState('');
  const [following, setFollowing] = useState(false);
  const [errors, setErrors] = useState([]);
  const addFriendModalRef = useRef(null);
  const submitButtonRef = useRef(null);
  const history = useHistory();

  
  useEffect(() => {
    // submitButtonRef.current.focus();
  }, []);

  // console.log("login", history);
  if (!sessionUser) {
    return <Redirect to='/login' />;
  }

  const handleSubmit = e => {
    e.preventDefault();
    setErrors([]);

    return dispatch(relationshipActions.createOneRelationship({
      relationship: {
        myUserId: sessionUser.id,
        credential,
        message,
        followingship: (following? 12: 0)
      }
    }))
      .then(res => {
        if (addFriendModalRef.current)
          addFriendModalRef.current.style.display = "none";
        history.push('/allspots');
      })
      .catch(res => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      });    
  };

  const handleCancelClick = e => {
    e.preventDefault();
    if (addFriendModalRef.current)
      addFriendModalRef.current.style.display = "none";
    history.push('/allspots');
  }

  return (
    <div className="modal" ref={addFriendModalRef}>
      <form
        className='form-container modal-content'
        onSubmit={handleSubmit}
      >
        <h3>Request to Add a Friend</h3>
      
        <ul className='error-messages'>
          {errors.map((error) => <li key={nanoid()}>{error}</li>)}
        </ul>
        <div className="inputs-div">
          <div className="input-div">
            <label>Username/Email To Request</label>
            <input
              className='input'
              type='text'
              value={credential}
              onChange={e => setCredential(e.target.value)}
              required
              autoFocus={true}
            />
          </div>
          <div className="input-div">
            <label>Message</label>
            <input
              className='input'
              type='message'
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
          </div>
          <div className="input-div">
            <label>Follow them?</label>
            <input
              className='input-number'
              type='checkbox'
              // value={following}
              checked={following}
              onChange={e => setFollowing(e.target.checked)}
            />
          </div>
        </div>
        <div className="buttons-div">
          <button
            className='button'
            type='submit'
            ref={submitButtonRef}
          >Send Request</button>
          <button
            className='button button-Reset'
            onClick={handleCancelClick}
          > Cancel </button>
        </div>
      </form>
    </div>
  );
}
