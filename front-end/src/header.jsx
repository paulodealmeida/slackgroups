import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {blue900} from 'material-ui/styles/colors';

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleToggle() {
    this.setState({open: !this.state.open});
  }

  handleClose() {
    this.setState({open: false});
  }

  showAddGroupModal() {
    this.props.showAddGroupModal();
    this.handleClose();
  }

  showSignInModal() {
    this.props.showSignInModal();
    this.handleClose();
  }

  showSignUpModal() {
    this.props.showSignUpModal();
    this.handleClose();
  }

  signOut() {
    localStorage.removeItem('auth_token');
    this.showSnackbarMessage('Successfully signed out');
    this.handleClose();
  }

  render() {

    const AppBarStyle = {
      backgroundColor: blue900
    };

    return (
      <div>
        <AppBar
          title="Slackgroups"
          style={AppBarStyle}
          onLeftIconButtonTouchTap={this.handleToggle}
        />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <AppBar
            title="Menu"
            style={AppBarStyle}
            showMenuIconButton={false}
          />
          {(localStorage.getItem('auth_token') == null ) ?
            [
              <MenuItem onTouchTap={this.showSignInModal.bind(this)} >
                Sign In
              </MenuItem>,
              <MenuItem onTouchTap={this.showSignUpModal.bind(this)} >
                Sign Up
              </MenuItem>
            ]
          : null}
          {(localStorage.getItem('auth_token') != null ) ?
            [
              <MenuItem onTouchTap={this.showAddGroupModal.bind(this)} >
                Add New Group
              </MenuItem>,
              <MenuItem onTouchTap={this.signOut.bind(this)} >
                Sign Out
              </MenuItem>
            ]
          : null}
        </Drawer>
      </div>
    )
  }
};

export default Header;
