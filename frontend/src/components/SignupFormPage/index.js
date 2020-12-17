// frontend/src/components/SignupFormPage/index.js

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

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
    if(password.toString() !== confirmPassword.toString()){
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
        {errors.map((error, index) => <li key={index}>{error}</li>)}
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

export default SignupFormPage;