import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {blue900} from 'material-ui/styles/colors';
import * as axios from 'axios';

const queryString = require('query-string');

var ModalSignUp = React.createClass({

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
    this.setState({ errorTextPasswordConfirmation: '' });
  },

  handleOpen: function() {
    this.resetErrorMessage();
    this.setState({ open: true });
  },

  handleClose: function() {
    this.setState({ open: false });
  },

  handleSignUpErrors: function(errors) {
    if (errors.password) {
      this.setState({ errorTextPassword: 'Password ' + errors.password });
      this.setState({ errorTextPasswordConfirmation: 'Password ' + errors.password });
    }
    if (errors.password_confirmation) {
      this.setState({ errorTextPasswordConfirmation: 'Password Confirmation ' + errors.password_confirmation });
    }
    if (errors.email) {
      this.setState({ errorTextEmail: 'Email ' + errors.email });
    }
  },

  handleSignUp: function() {

    var hasError = false;

    var user = {
      email: this.refs.email.getValue(),
      password: this.refs.password.getValue(),
      password_confirmation: this.refs.password_confirmation.getValue()
    };

    if (!this.validateEmpty(user.email)) {
      this.setState({ errorTextEmail: "This field is required." });
      hasError = true;
    }

    if (!this.validateEmpty(user.password)) {
      this.setState({ errorTextPassword: "This field is required." });
      hasError = true;
    }

    if (!this.validateEmpty(user.password_confirmation)) {
      this.setState({ errorTextPasswordConfirmation: "This field is required." });
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

      axios.post(System.url_api + 'users',
                 queryString.stringify({ email: user.email,
                                         password: user.password,
                                         password_confirmation: user.password_confirmation }),
                 config)
        .then(function(response){
          _this.handleClose();
          localStorage.setItem('auth_token', response.data.auth_token);
        }).catch(function(error) {
          _this.handleSignUpErrors(error.response.data.errors)
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
        label="Sign Up"
        primary={true}
        onTouchTap={this.handleSignUp}
        style={style}
      />
    ];

    return(
      <div>
        <Dialog
          title='Sign Up'
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
          <TextField
            floatingLabelText="Password confirmation"
            ref="password_confirmation"
            errorText={this.state.errorTextPasswordConfirmation}
            fullWidth={true}
            type="password"
          />
        </Dialog>
      </div>
    )
  }
});

export default ModalSignUp;
