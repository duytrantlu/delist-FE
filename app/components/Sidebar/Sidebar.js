/*eslint-disable*/
import React from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";

import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap";

import {
  FooterNavbarDiv,
  spanStyle,
  expandSpanStyle
} from './styles';

class Sidebar extends React.Component {
  state = {
    collapseOpen: false,
  };
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  // toggles collapse between opened and closed (true/false)
  toggleCollapse = () => {
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };
  // closes the collapse
  closeCollapse = () => {
    this.setState({
      collapseOpen: false
    });
  };
  // creates the links that appear in the left menu / Sidebar
  createLinks = (routes, role) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        if (prop.path === '/user-manager' && role === 'User') return null;
        return (
          <NavItem key={key}>
            <NavLink
              to={prop.layout + prop.path}
              tag={NavLinkRRD}
              onClick={this.closeCollapse}
              activeClassName="active"
            >
              <i className={prop.icon} />
              {prop.name}
            </NavLink>
          </NavItem>
        );
      } else {
        return null;
      }
    });
  };

  createLinksCollapse = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <NavItem key={key}>
            <NavLink
              to={prop.layout + prop.path}
              tag={NavLinkRRD}
              onClick={this.closeCollapse}
              activeClassName="active"
            >
              <i className={prop.icon} />
            </NavLink>
          </NavItem>
        );
      } else {
        return null;
      }
    });
  };
  render() {
    const { bgColor, routes, logo, handleCollapse, handleExpand, isOpenColapse, role } = this.props;
    let navbarBrandProps;
    if (logo && logo.innerLink) {
      navbarBrandProps = {
        to: logo.innerLink,
        tag: Link
      };
    } else if (logo && logo.outterLink) {
      navbarBrandProps = {
        href: logo.outterLink,
        target: "_blank"
      };
    }
    return (
      <>
        {isOpenColapse ?
          (<Navbar
            className="navbar-vertical fixed-left navbar-light bg-white"
            expand="md"
            id="sidenav-main"
          >

            <Container fluid>
              {/* Toggler */}
              <button
                className="navbar-toggler"
                type="button"
                onClick={this.toggleCollapse}
              >
                <span className="navbar-toggler-icon" />
              </button>
              {/* Brand */}
              {logo ? (
                <NavbarBrand className="pt-0" {...navbarBrandProps}>
                  <img
                    alt={logo.imgAlt}
                    className="navbar-brand-img"
                    src={logo.imgSrc}
                  />
                </NavbarBrand>
              ) : null}
              {/* User */}
              <Nav className="align-items-center d-md-none">
                <UncontrolledDropdown nav>
                  <DropdownToggle nav className="nav-link-icon">
                    <i className="ni ni-bell-55" />
                  </DropdownToggle>
                  <DropdownMenu
                    aria-labelledby="navbar-default_dropdown_1"
                    className="dropdown-menu-arrow"
                    right
                  >
                    <DropdownItem>Action</DropdownItem>
                    <DropdownItem>Another action</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Something else here</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav>
                  <DropdownToggle nav>
                    <Media className="align-items-center">
                      <span className="avatar avatar-sm rounded-circle">
                        <img
                          alt="..."
                          src={require("assets/img/theme/team-1-800x800.jpg")}
                        />
                      </span>
                    </Media>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-arrow" right>
                    <DropdownItem className="noti-title" header tag="div">
                      <h6 className="text-overflow m-0">Welcome!</h6>
                    </DropdownItem>
                    <DropdownItem to="/admin/user-profile" tag={Link}>
                      <i className="ni ni-single-02" />
                      <span>My profile</span>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                      <i className="ni ni-user-run" />
                      <span>Logout</span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
              {/* Collapse */}
              <Collapse navbar isOpen={this.state.collapseOpen}>
                {/* Collapse header */}
                <div className="navbar-collapse-header d-md-none">
                  <Row>
                    {logo ? (
                      <Col className="collapse-brand" xs="6">
                        {logo.innerLink ? (
                          <Link to={logo.innerLink}>
                            <img alt={logo.imgAlt} src={logo.imgSrc} />
                          </Link>
                        ) : (
                            <a href={logo.outterLink}>
                              <img alt={logo.imgAlt} src={logo.imgSrc} />
                            </a>
                          )}
                      </Col>
                    ) : null}
                    <Col className="collapse-close" xs="6">
                      <button
                        className="navbar-toggler"
                        type="button"
                        onClick={this.toggleCollapse}
                      >
                        <span />
                        <span />
                      </button>
                    </Col>
                  </Row>
                </div>
                {/* Navigation */}
                <Nav navbar>{this.createLinks(routes, role)}</Nav>
              </Collapse>
              <FooterNavbarDiv className="footerNavbarCollapse">
                <hr />
                <span style={spanStyle} onClick={handleCollapse}>
                  <i className="fa fa-arrow-left" aria-hidden="true"></i>
                </span>

              </FooterNavbarDiv>
            </Container>
          </Navbar>) : (
            <Navbar
              className="navbar-vertical fixed-left navbar-light bg-white"
              expand="md"
              id="sidenav-main"
              style={{ 'width': '6%' }}
            >
              <Container fluid>
                {/* Toggler */}
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={this.toggleCollapse}
                >
                  <span className="navbar-toggler-icon" />
                </button>
                {logo ? (
                  <NavbarBrand className="pt-0" {...navbarBrandProps}>
                    <img
                      alt={logo.imgAlt}
                      className="navbar-brand-img"
                      src={logo.imgSrc}
                      style={{ 'width': '50px' }}
                    />
                  </NavbarBrand>
                ) : null}
                {/* User */}
                <Nav className="align-items-center d-md-none">
                  <UncontrolledDropdown nav>
                    <DropdownToggle nav className="nav-link-icon">
                      <i className="ni ni-bell-55" />
                    </DropdownToggle>
                    <DropdownMenu
                      aria-labelledby="navbar-default_dropdown_1"
                      className="dropdown-menu-arrow"
                      right
                    >
                      <DropdownItem>Action</DropdownItem>
                      <DropdownItem>Another action</DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>Something else here</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <UncontrolledDropdown nav>
                    <DropdownToggle nav>
                      <Media className="align-items-center">
                        <span className="avatar avatar-sm rounded-circle">
                          <img
                            alt="..."
                            src={require("assets/img/theme/team-1-800x800.jpg")}
                          />
                        </span>
                      </Media>
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-arrow" right>
                      <DropdownItem className="noti-title" header tag="div">
                        <h6 className="text-overflow m-0">Welcome!</h6>
                      </DropdownItem>
                      <DropdownItem to="/admin/user-profile" tag={Link}>
                        <i className="ni ni-single-02" />
                        <span>My profile</span>
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                        <i className="ni ni-user-run" />
                        <span>Logout</span>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
                {/* Collapse */}
                <Collapse navbar isOpen={this.state.collapseOpen}>
                  {/* Collapse header */}
                  <div className="navbar-collapse-header d-md-none">
                    <Row>
                      {logo ? (
                        <Col className="collapse-brand" xs="6">
                          {logo.innerLink ? (
                            <Link to={logo.innerLink}>
                              <img alt={logo.imgAlt} src={logo.imgSrc} />
                            </Link>
                          ) : (
                              <a href={logo.outterLink}>
                                <img alt={logo.imgAlt} src={logo.imgSrc} />
                              </a>
                            )}
                        </Col>
                      ) : null}
                      <Col className="collapse-close" xs="6">
                        <button
                          className="navbar-toggler"
                          type="button"
                          onClick={this.toggleCollapse}
                        >
                          <span />
                          <span />
                        </button>
                      </Col>
                    </Row>
                  </div>
                  {/* Navigation */}
                  <Nav navbar>{this.createLinksCollapse(routes)}</Nav>
                </Collapse>
                <FooterNavbarDiv className="footerNavbarCollapse">
                  <hr />
                  <span style={expandSpanStyle} onClick={handleExpand}>
                    <i className="fa fa-arrow-right" aria-hidden="true"></i>
                  </span>
                </FooterNavbarDiv>
              </Container>
            </Navbar>
          )}
      </>
    );
  }
}

Sidebar.defaultProps = {
  routes: [{}]
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired
  })
};

export default Sidebar;
