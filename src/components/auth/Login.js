import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { compose } from 'redux;
// import { connect } from 'react-redux;
import { firebaseConnect } from 'react-redux-firebase';

class Login extends Component {
  render() {
    <div>
      <h1>Login Page</h1>
    </div>;
  }
}

Login.propTypes = {
  firebase: PropTypes.object.isRequired
};

export default firebaseConnect()(Login);
