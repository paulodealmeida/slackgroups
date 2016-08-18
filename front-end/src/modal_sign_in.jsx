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
  },

  handleOpen: function() {
    this.resetErrorMessage();
    this.setState({ open: true });
  },

  handleClose: function() {
    this.setState({ open: false });
  },

  handleSignIn: function() {

    var hasError = false;

    var user = {
      email: this.refs.email.getValue(),
      password: this.refs.password.getValue()
    };

    if (!this.validateEmpty(user.email)) {
      this.setState({ errorTextName: "This field is required." });
      hasError = true;
    }

    if (!this.validateEmpty(user.password)) {
      this.setState({ errorTextUrl: "This field is required." });
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
        .then(function(response){
          _this.handleClose();
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

    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Sign In"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSignIn}
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
            hintText="Email"
            ref="email"
            errorText={this.state.errorTextEmail}
            fullWidth={true}
          />
          <TextField
            hintText="Password"
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
