// frontend/src/components/SignupFormPage/index.js

import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { nanoid} from 'nanoid';

import * as sessionActions from '../../store/session';

import '../Forms.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) {
    return <Redirect to='/' />;
  }

  const handleSubmit = e => {
    e.preventDefault();
    setErrors([]);
    if (password.toString() !== confirmPassword.toString()) {
      return setErrors(["Confirmed password doesn't match!"]);
    }
    return dispatch(sessionActions.signup({ username, email, password }))
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
        {errors.map((error) => <li key={nanoid()}>{error}</li>)}
      </ul>
      <label>
        Username
        <input
          type='text'
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Email
        <input
          type='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
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
      <label>
        Confirm Password
        <input
          type='password'
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
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

export function SignupFormModal() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const history = useHistory();
  const signupModalRef = useRef(null);

  if (sessionUser) {
    return <Redirect to='/' />;
  }

  const handleSubmit = e => {
    e.preventDefault();
    setErrors([]);
    if (password.toString() !== confirmPassword.toString()) {
      return setErrors(["Confirmed password doesn't match!"]);
    }
    return dispatch(sessionActions.signup({ username, email, password }))
      .then(res => {
        if (signupModalRef.current)
          signupModalRef.current.style.display = "none";
      })
      .catch(res => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      });
  };
  const handleCancelClick = e => {
    e.preventDefault();
    if (signupModalRef.current)
      signupModalRef.current.style.display = "none";
    history.push('/');
  }

  const handleLoginClick = e => {
    e.preventDefault();
    // if (signupModalRef.current)
    //   signupModalRef.current.style.display = "none";
    history.push('/login');
  }
  return (
    <div className='modal' ref={signupModalRef}>
      <form
        className='modal-content'
        onSubmit={handleSubmit}
      >
        <h3>Sign up as a new user</h3>
        <ul className='error-messages'>
          {errors.map((error) => <li key={nanoid()}>{error}</li>)}
        </ul>
        <div className="inputs-div">
          <div className="input-div">
            <label>Username</label>
            <input
              className="input"
              type='text'
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              autoFocus={true}
            />
          </div>
          <div className="input-div">
            <label>Email</label>
            <input
              className="input"
              type='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-div">
            <label>Password</label>
            <input
              className="input"
              type='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-div">
            <label>Confirm Password</label>
            <input
              className="input"
              type='password'
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="buttons-div">
            <button
              className='button'
              type='submit'
            >Sign up</button>
            <button
              className='button button-Reset'
              onClick={handleCancelClick}
            > Cancel </button>
          </div>
          <div className="login-signup-invite">
            <span>Already have an account?</span>
            <span>
              <button className="button button-invite" onClick={handleLoginClick}>Click to Login</button>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignupFormPage;