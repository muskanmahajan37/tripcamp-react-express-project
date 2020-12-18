// frontend/src/components/LoginFormPage/index.js

import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';

import * as sessionActions from '../../store/session';

import '../Forms.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) {
    return <Redirect to='/' />;
  }


  const handleSubmit = e => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(res => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      });
  };
  return (
    <form
      className='form-container'
      onSubmit={handleSubmit}
    >
      <ul className='error-messages'>
        {errors.map((error, index) => <li key={index}>{error}</li>)}
      </ul>
      <label>
        Username or Email
        <input
          type='text'
          value={credential}
          onChange={e => setCredential(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </label>
      <button
        className='button'
        type='submit'
      >
        Log in
      </button>
    </form>
  );
}

export function LoginFormModal() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const loginModalRef = useRef(null);
  const history = useHistory();

  if (sessionUser) {
    return <Redirect to='/' />;
  }


  const handleSubmit = e => {
    e.preventDefault();
    setErrors([]);

    return dispatch(sessionActions.login({ credential, password }))
      .then(res => {
        if (loginModalRef.current)
          loginModalRef.current.style.display = "none";
      })
      .catch(res => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      });
  };

  const handelCancelClick = e => {
    // e.preventDefault();
    console.log(loginModalRef.current);
    if (loginModalRef.current)
      loginModalRef.current.style.display = "none";
    history.push('/');
    // return <Redirect to='/' />;
  }

  return (
    <div className="modal" ref={loginModalRef}>
      <form
        className='form-container modal-content'
        onSubmit={handleSubmit}
      >
        <h3>Login Form</h3>
        <ul className='error-messages'>
          {errors.map((error, index) => <li key={index}>{error}</li>)}
        </ul>
        <div className="inputs-div">
          <div className="input-div">
            <label>Username or Email</label>
            <input
              className='input'
              type='text'
              value={credential}
              onChange={e => setCredential(e.target.value)}
              required
            />
          </div>
          <div className="input-div">
            <label>Password</label>
            <input
              className='input'
              type='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="buttons-div">
          <button
            className='button'
            type='submit'
          >Log in</button>
          <button
            className='button button-Reset'
            onClick={handelCancelClick}
          > Cancel </button>
        </div>
      </form>
    </div>
  );
}
export default LoginFormPage;