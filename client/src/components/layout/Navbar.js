// import React, { Component } from 'react';
import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';



// class Navbar extends Component {
  const Navbar = ({ auth: { isAuthenticated, loading}, logout}) => {
  // render() {

    const authLinks = (
        <ul>
        <li>
          <Link to="/dashboard">
            <span className="hide-sm">
              Dashboard
              </span>
          </Link>
        </li>
        <li>
          <a onClick={logout} href="#!">
            <span className="hide-sm">Logout</span>
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul>
        <li>
          <a href="!#">Developers</a>
        </li>
        <li>
          <Link to='/register'>Register</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
      </ul>
    )



    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            DevConnector
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles">
                  Developers
                </Link>
              </li>
            </ul>

            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {!loading && (<Fragment>{ isAuthenticated ? authLinks : guestLinks}</Fragment>)};
      </nav>
    )
  // }
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect( mapStateToProps, {logout})(Navbar);
