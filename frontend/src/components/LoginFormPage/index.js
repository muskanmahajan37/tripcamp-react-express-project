// frontend/src/components/LoginFormPage/index.js

import React, { useState, useRef, useEffect } from 'react';
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
  const submitButtonRef = useRef(null);
  const history = useHistory();

  
  useEffect(() => {
    // submitButtonRef.current.focus();
  }, []);

  // console.log("login", history);
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
        // history.go(2);
      })
      .catch(res => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      });
  };

  const handleCancelClick = e => {
    e.preventDefault();
    if (loginModalRef.current)
      loginModalRef.current.style.display = "none";
    history.push('/');
  }

  const handleSignupClick = e => {
    e.preventDefault();
    if (loginModalRef.current)
      loginModalRef.current.style.display = "none";    
    history.push('/signup');
  }
  const handleDemoClick = e => {
    // e.preventDefault(); // no preventing default so we will login immediately
    setCredential('Demo-user');
    setPassword('password');
  }

  return (
    <div className="modal" ref={loginModalRef}>
      <form
        className='form-container modal-content'
        onSubmit={handleSubmit}
      >
        <h3>Login to your account</h3>
      
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
            ref={submitButtonRef}
          >Log in</button>
          <button
            className='button button-Reset'
            onClick={handleCancelClick}
          > Cancel </button>
        </div>
        <div className="login-signup-invite">
          <span>Don't have an account?</span>
          <span>
            <button className="button button-invite" onClick={handleSignupClick}>Sign up</button>
          </span>
          <span>
            <button className="button button-invite" onClick={handleDemoClick}>Demo</button>
          </span>
        </div>          
      </form>
    </div>
  );
}
export default LoginFormPage;