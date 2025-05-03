import React, { useState, useContext } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState('Login');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const { url, setToken, setUser } = useContext(StoreContext);

  const onChangeHandler = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const endpoint = currState === 'Login' ? '/api/users/login' : '/api/users/register';
    const payload = currState === 'Login'
      ? { email: formData.email, password: formData.password }
      : {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password
        };

    try {
      const res = await axios.post(url + endpoint, payload);
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
        setShowLogin(false);
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error('Error during login/signup:', err);
      alert('There was an error processing your request. Please try again.');
    }
  };

  return (
    <div className='login-popup'>
      <form onSubmit={onSubmitHandler} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img src={assets.cross_icon} alt="Close" onClick={() => setShowLogin(false)} />
        </div>
        <div className="login-popup-inputs">
          {currState === 'Sign Up' && (
            <>
              <input
                name='firstName'
                onChange={onChangeHandler}
                value={formData.firstName}
                type="text"
                placeholder='First Name'
                required
              />
              <input
                name='lastName'
                onChange={onChangeHandler}
                value={formData.lastName}
                type="text"
                placeholder='Last Name'
                required
              />
            </>
          )}
          <input
            name='email'
            onChange={onChangeHandler}
            value={formData.email}
            type="email"
            placeholder='Email'
            required
          />
          <input
            name='password'
            onChange={onChangeHandler}
            value={formData.password}
            type="password"
            placeholder='Password'
            required
          />
        </div>
        <button type='submit'>{currState === 'Login' ? 'Login' : 'Create Account'}</button>
        {currState === 'Sign Up' && (
          <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, I agree to terms of use & privacy policy.</p>
          </div>
        )}
        <p>
          {currState === 'Login' ? "Don't have an account?" : 'Already have an account?'}
          <span onClick={() => setCurrState(currState === 'Login' ? 'Sign Up' : 'Login')}>
            {currState === 'Login' ? ' Sign Up here' : ' Login here'}
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginPopup;
