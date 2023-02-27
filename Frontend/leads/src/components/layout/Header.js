import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../reducer/actions/auth';

const Header = ({ isAuthenticated, user, logout }) => {
  return (
    <nav className='navbar navbar-expand-sm bg-light '>
      <div className='container'>
        <Link className='navbar-brand' to='/'>
          Leads Manager
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <ul className='navbar-nav  mb-lg-0 ml-auto '>
          <span className='navbar-text mx-4'>
            <strong>{user ? `@${user.username}` : ''}</strong>
          </span>
          {isAuthenticated ? (
            <li className='nav-item'>
              <button
                className='btn btn-info btn-sm text-light nav-link'
                onClick={logout}
              >
                Logout
              </button>
            </li>
          ) : (
            <>
              <li className='nav-item'>
                <Link className='nav-link' to='/register'>
                  Register
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/login'>
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => {
  const { isAuthenticated, user } = state.auth;
  return { isAuthenticated, user };
};

export default connect(mapStateToProps, { logout })(Header);
