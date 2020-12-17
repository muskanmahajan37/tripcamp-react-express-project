// frontend/src/components/LoginFormPage/index.js

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as sessionActions from '../../store/session';

import './LoginForm.css';

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

export default LoginFormPage;