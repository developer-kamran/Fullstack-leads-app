import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../reducer/actions/auth.js';

const Login = ({ isAuthenticated, dispatch }) => {
  const [data, setData] = useState({
    username: '',
    password: '',
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    login(dispatch, data.username, data.password);
  };
  if (isAuthenticated) {
    return <Navigate to='/'></Navigate>;
  }

  return (
    <>
      <div className='container'>
        <div className='col-md-6 m-auto shadow-lg mt-5 p-5'>
          <h2 className='text-center'>Login</h2>
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

            <div className='form-group'>
              <label htmlFor=''>Password</label>
              <input
                type='password'
                id='password'
                className='form-control'
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>

            <div className='form-group my-3'>
              <button type='submit' className='btn btn-primary'>
                Login
              </button>
            </div>
            <p>
              Don't have an account?
              <Link to={'/register'}> Register Here</Link>
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

export default connect(mapStateToProps)(Login);
