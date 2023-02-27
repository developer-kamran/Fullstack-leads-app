import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../reducer/actions/auth.js';
import { CREATE_MESSAGE } from '../reducer/actions/types.js';

const Register = ({ dispatch, isAuthenticated }) => {
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, password2 } = data;
    if (password !== password2) {
      dispatch({
        type: CREATE_MESSAGE,
        payload: { passwordNotMatch: 'Password Do Not Match' },
      });
    } else {
      register(dispatch, { username, email, password });
    }
  };
  if (isAuthenticated) {
    return <Navigate to='/'></Navigate>;
  }

  return (
    <>
      <div className='container'>
        <div className='col-md-6 m-auto shadow-lg mt-5 p-5 '>
          <h2 className='text-center'>Register</h2>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className='form-group my-3'>
              <label htmlFor=''>Username</label>
              <input
                type='text'
                name='username'
                id='username'
                className='form-control'
                value={data.username}
                onChange={(e) => setData({ ...data, username: e.target.value })}
              />
            </div>
            <div className='form-group my-3'>
              <label htmlFor=''>Email</label>
              <input
                type='email'
                id='email'
                className='form-control'
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>
            <div className='form-group my-3'>
              <label htmlFor=''>Password</label>
              <input
                type='password'
                id='password'
                className='form-control'
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>
            <div className='form-group'>
              <label htmlFor=''>Confirm Password</label>
              <input
                type='Password'
                name='password2'
                id='password2'
                className='form-control'
                value={data.password2}
                onChange={(e) =>
                  setData({ ...data, password2: e.target.value })
                }
              />
            </div>
            <div className='form-group my-3'>
              <button type='submit' className='btn btn-primary'>
                Register
              </button>
            </div>
            <p>
              Already have an account? <Link to={'/login'}>Login Here</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return { isAuthenticated: state.auth.isAuthenticated };
};

export default connect(mapStateToProps)(Register);
