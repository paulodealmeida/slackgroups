import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {blue900} from 'material-ui/styles/colors';
import * as axios from 'axios';

const queryString = require('query-string');

var ModalSignIn = React.createClass({

  getInitialState: function() {
    return {
      open: false,
      errorTextName: "",
      errorTextUrl: "",
      errorTextDescription: ""
    }
  },

  resetErrorMessage: function() {
    this.setState({ errorTextEmail: '' });
    this.setState({ errorTextPassword: '' });
  },

  handleOpen: function() {
    this.resetErrorMessage();
    this.setState({ open: true });
  },

  handleClose: function() {
    this.setState({ open: false });
  },

  handleSignInErrors: function(errors) {
    this.setState({ errorTextEmail: errors });
    this.setState({ errorTextPassword: errors });
  },

  handleSignIn: function() {

    var hasError = false;

    var user = {
      email: this.refs.email.getValue(),
      password: this.refs.password.getValue()
    };

    if (!this.validateEmpty(user.email)) {
      this.setState({ errorTextEmail: "This field is required." });
      hasError = true;
    }

    if (!this.validateEmpty(user.password)) {
      this.setState({ errorTextPassword: "This field is required." });
      hasError = true;
    }

    if (!hasError) {

      var config = {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        responseType: 'json'
      }

      var _this = this;

      axios.post(System.url_api + 'sessions',
                 queryString.stringify({ email: user.email,
                                         password: user.password }),
                 config)
        .then(function(response) {
          _this.handleClose();
          localStorage.setItem('auth_token', response.data.auth_token);
        }).catch(function(error) {
          _this.handleSignInErrors(error.response.data.errors)
        });
    }

  },

  validateEmpty: function(element) {
    if (element == undefined || element == null || element == '') {
      return false;
    }
    return true;
  },

  render() {

    const style = {
      margin: 10,
    };

    const actions = [
      <RaisedButton
        label="Close"
        onTouchTap={this.handleClose}
        style={style}
      />,
      <RaisedButton
        label="Sign In"
        primary={true}
        onTouchTap={this.handleSignIn}
        style={style}
      />
    ];

    return(
      <div>
        <Dialog
          title='Sign In'
          actions={actions}
          modal={false}
          open={this.state.open}
          autoScrollBodyContent={true}
          onRequestClose={this.handleClose}
        >
          <TextField
            floatingLabelText="Email"
            ref="email"
            errorText={this.state.errorTextEmail}
            fullWidth={true}
          />
          <TextField
            floatingLabelText="Password"
            ref="password"
            errorText={this.state.errorTextPassword}
            fullWidth={true}
            type="password"
          />
        </Dialog>
      </div>
    )
  }
});

export default ModalSignIn;
