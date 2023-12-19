import React, { useContext } from 'react';
import { Route, redirect } from 'react-router-dom';
import { AuthContext } from '../contexts/TwitterAuthContext';

const PrivateRoute = ({ element: RouteComponent, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      element={(routeProps) => (!!currentUser ? <RouteComponent {...routeProps} /> : redirect('/login'))}
    />
  );
};

export default PrivateRoute;
