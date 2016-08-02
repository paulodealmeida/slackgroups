import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {blue900} from 'material-ui/styles/colors';

var ModalAddGroup = React.createClass({

  getInitialState: function() {
    return { 
      open: false
    }
  },

  handleOpen: function() {
    this.setState({open: true});
  },

  handleClose: function() {
    this.setState({open: false});
  },

  handleAddGroup: function() {
    this.setState({open: false});
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

          <div className="modal-content">
      
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TextField hintText="Name" value={this.state.name} errorText="This field is required." fullWidth={true} />
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TextField hintText="Link" value={this.state.url} errorText="This field is required." fullWidth={true} />
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TextField hintText="Description" multiLine={true} value={this.state.description} errorText="This field is required." fullWidth={true} />
              </div>
            </div>
          </div>

        </Dialog>
      </div>

    )
  }
});

export default ModalAddGroup;