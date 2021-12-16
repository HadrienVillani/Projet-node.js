import React, { useState } from 'react';
import Header from './Header';
import axios from 'axios';
function ConnectForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector('.email.error');
    const passwordError = document.querySelector('.password.error');
    axios
      .post(
        `${process.env.REACT_APP_API_URL}api/user/login`,
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      )
      .then(function (res) {
        if (res.data.errors) {
          emailError.innerHTML = res.data.errors.email;
          passwordError.innerHTML = res.data.errors.password;
        } else {
          console.log(res.data);
          const user = res.data.user;
          localStorage.setItem('user', user);
          window.location = '/';
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Header />
      <form action='' className='formConnect' onSubmit={handleLogin}>
        <div className='formConnectEmail'>
          <label htmlFor='email'> Email</label>
          <input
            type='text'
            name='email'
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className='email error'></div>
        </div>
        <div className='formConnectPassword'>
          <label htmlFor='password'> Password</label>
          <input
            type='password'
            name='password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className='password error'></div>
        </div>
        <input type='submit' value='Se connecter' />
      </form>
    </div>
  );
}

export default ConnectForm;
