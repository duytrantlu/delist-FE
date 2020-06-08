import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import NotFoundPage from 'containers/NotFoundPage/Loadable';

const PrivateRoutes = ({ isAuthenticated, role, children }) => {

  let isFound = false;
  let hasPermissions = false;
  if (children) {
    children.props.children.forEach(function (route) { // eslint-disable-line prefer-arrow-callback
      if (route) {
        // Check if current path matches a route, and it has role permissions
        const routePath = route.props.path.toLowerCase();
        const routeMatcher = new RegExp(routePath.replace(/:[^\s/]+/g, '([\\w-]+)'));
        const url = location.pathname.toLowerCase();
        const match = url.match(routeMatcher);
        if (match && match.input === match[0]) {
          isFound = true;
          if (!route.userRoles) hasPermissions = true;
          else if (route.userRoles) {
            let roles = route.userRoles.replace(/\s/g, '');
            roles = roles.split(',');
            if (roles.indexOf(role) > -1) hasPermissions = true;
          }
        }
      }
    });
  }

  return (
    // eslint-disable-next-line no-nested-ternary
    isAuthenticated && hasPermissions && isFound ? (
      <div>
        {children}
      </div>
    ) : (
        !isFound ? (
          <NotFoundPage />
        ) : (
            <Redirect to={{ pathname: '/auth/login' }} />
          )
      )
  );
};
PrivateRoutes.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  role: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
  // children: PropTypes.instanceOf(Route).isRequired
};

export default PrivateRoutes;
