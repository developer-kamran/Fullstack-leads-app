import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ children, auth, ...rest }) => {
  const location = useLocation();

  return auth.isLoading ? (
    <h2>Loading...</h2>
  ) : auth.isAuthenticated ? (
    children
  ) : (
    <Navigate Navigate to='/login' state={{ from: location }} />
  );
};
const mapStateToProps = (state) => {
  const auth = state.auth;
  return { auth };
};

export default connect(mapStateToProps)(PrivateRoute);
