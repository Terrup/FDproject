import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken, setUserName } = useContext(StoreContext); // Assuming setUserName is in context

  const [currState, setCurrState] = useState('Login');
  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loading

    let newUrl = url;
    if (currState === 'Login') {
      newUrl += '/api/users/login';
    } else {
      newUrl += '/api/users/register';
    }

    try {
      const response = await axios.post(newUrl, data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);

        // Store user data in localStorage
        if (response.data.user) {
          localStorage.setItem('userName', response.data.user.name); // Store username
          setUserName(response.data.user.name); // Update context state (if using context)
        }

        setShowLogin(false); // Close the login popup
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error during login/signup:', error);
      alert('There was an error processing your request. Please try again.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className='login-popup-container'>
        <div className='login-popup-title'>
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt='' />
        </div>
        <div className='login-popup-inputs'>
          {currState === 'Login' ? (
            <></>
          ) : (
            <input
              name='name'
              onChange={onChangeHandler}
              value={data.name}
              type='text'
              placeholder='Your name'
              required
            />
          )}
          <input
            name='email'
            onChange={onChangeHandler}
            value={data.email}
            type='email'
            placeholder='Your email'
            required
          />
          <input
            name='password'
            onChange={onChangeHandler}
            value={data.password}
            type='password'
            placeholder='Password'
            required
          />
        </div>
        <button type='submit' disabled={loading}>
          {loading ? 'Loading...' : currState === 'Sign Up' ? 'Create account' : 'Login'}
        </button>

        {currState === 'Sign Up' && (
          <div className='login-popup-condition'>
            <input type='checkbox' required />
            <p className='continuee'>By continuing, I agree to the terms of use & privacy policy</p>
          </div>
        )}

        {currState === 'Login' ? (
          <p>
            Create a new account? <span onClick={() => setCurrState('Sign Up')}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account? <span onClick={() => setCurrState('Login')}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
