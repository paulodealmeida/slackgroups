import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import injectTapEventPlugin from 'react-tap-event-plugin';

var ModalShowGroup = React.createClass({

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

  render() {

    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.handleClose} />
    ];

    return(

      <div>

        <Dialog
          title={this.props.group.title}
          actions={actions}
          modal={true}
          open={this.state.open}
        >

          <div className="modal-content">
            <p>{this.props.group.description}</p>
            <a href={this.props.group.link} target="_blank" className="link_group">{this.props.group.url}</a>
          </div>

        </Dialog>
      </div>

    )
  }
});

export default ModalShowGroup;