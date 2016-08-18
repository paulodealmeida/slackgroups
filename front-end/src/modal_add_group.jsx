import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {blue900} from 'material-ui/styles/colors';
import * as axios from 'axios';

const queryString = require('query-string');

var ModalAddGroup = React.createClass({

  getInitialState: function() {
    return {
      open: false,
      errorTextName: "",
      errorTextUrl: "",
      errorTextDescription: ""
    }
  },

  resetErrorMessage: function() {
    this.setState({ errorTextName: "" });
    this.setState({ errorTextUrl: "" });
    this.setState({ errorTextDescription: "" });
  },

  handleOpen: function() {
    this.resetErrorMessage();
    this.setState({ open: true });
  },

  handleClose: function() {
    this.setState({ open: false });
  },

  handleAddGroup: function() {

    var hasError = false;

    var group = {
      title: this.refs.title.getValue(),
      url: this.refs.url.getValue(),
      description: this.refs.description.getValue()
    };

    if (!this.validateEmpty(group.title)) {
      this.setState({ errorTextName: "This field is required." });
      hasError = true;
    }

    if (!this.validateEmpty(group.url)) {
      this.setState({ errorTextUrl: "This field is required." });
      hasError = true;
    }

    if (!this.validateEmpty(group.description)) {
      this.setState({ errorTextDescription: "This field is required." });
      hasError = true;
    }

    // Send a post request with the new group

    if (!hasError) {

      var config = {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        responseType: 'json'
      }

      var _this = this;

      axios.post(System.url_api + 'groups',
                 queryString.stringify({ title: group.title,
                                         description: group.description,
                                         url: group.url }),
                 config)
        .then(function(response){
          _this.props.reloadGroups();
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
        onTouchTap={this.handleClose} />,
      <FlatButton
        label="Add"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleAddGroup} />
    ];

    return(
      <div>
        <Dialog
          title='Add new group'
          actions={actions}
          modal={true}
          open={this.state.open}
          autoScrollBodyContent={true}
        >
          <TextField
            hintText="Name"
            ref="title"
            errorText={this.state.errorTextName}
            fullWidth={true}
          />
          <TextField
            hintText="Link"
            ref="url"
            errorText={this.state.errorTextUrl}
            fullWidth={true}
          />
          <TextField
            hintText="Description"
            ref="description"
            errorText={this.state.errorTextDescription}
            fullWidth={true}
            multiLine={true}
            rows={2}
            rowsMax={4}
          />
        </Dialog>
      </div>
    )
  }
});

export default ModalAddGroup;
