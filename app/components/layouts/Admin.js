/* eslint-disable */

import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
// reactstrap components
import { Container } from 'reactstrap';
// core components
import AdminNavbar from 'components/Navbars/AdminNavbar';
import AdminFooter from 'components/Footers/AdminFooter';
import Sidebar from 'components/Sidebar/Sidebar.js';
import PrivateRoutes from 'containers/PrivateRoute';
import Auth from 'utils/Auth';
import routes from 'routes.js';
import './layouts.css';

class Admin extends React.Component {
  state = {
    isOpenColapse: true
  };

  handleCollapse = () => {
    this.setState({ isOpenColapse: false });
  }

  handleExpand = () => {
    this.setState({ isOpenColapse: true });
  }

  componentDidUpdate(e) {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.mainContent.scrollTop = 0;
  }

  getRoutes = (routes, role) =>
    routes.map((prop, key) => {
      if (prop.layout === '/admin') {
        if (prop.path === '/user-manager' && role === 'User') return null;
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    });

  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path,
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return 'Brand';
  };

  render() {
    const isAuthenticated = Auth.isAuthenticated();
    return (
      <>
        <Sidebar
          {...this.props}
          routes={routes}
          handleCollapse={this.handleCollapse}
          handleExpand={this.handleExpand}
          isOpenColapse={this.state.isOpenColapse}
          logo={{
            innerLink: '/admin/index',
            imgSrc: require('assets/img/brand/argon-react.png'),
            imgAlt: '...',
          }}
          role={Auth.getRole()}
        />
        <div className="main-content" style={this.state.isOpenColapse ? { "marginLeft": '250px' } : { "marginLeft": '90px' }} ref="mainContent">
          <AdminNavbar
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
            isAuthenticated={isAuthenticated}
            user={Auth.getUser() ? Auth.getUser().username : ''}
          />

          <PrivateRoutes
            isAuthenticated={isAuthenticated}
            role={Auth.getRole()}
          >
            <Switch>
              {this.getRoutes(routes, Auth.getRole())}
            </Switch>
          </PrivateRoutes>

          <Container fluid>
            <AdminFooter />
          </Container>
        </div>
      </>
    );
  }
}

export default Admin;
