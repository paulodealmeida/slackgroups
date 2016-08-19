import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {red500} from 'material-ui/styles/colors';
import DisplayGroups from './display_groups';
import ModalShowGroup from './modal_show_group';
import ModalAddGroup from './modal_add_group';
import ModalSignIn from './modal_sign_in';
import ModalSignUp from './modal_sign_up';
import Header from './header';
import * as axios from 'axios';

var MainBody = React.createClass({

  getInitialState: function() {
    return {
      groups: [],
      group: {}
    }
  },

  componentDidMount() {
    this.reloadGroups();
  },

  reloadGroups: function() {

    var _this = this;

    axios.get(System.url_api + "groups")
      .then(function (response) {
        _this.setState({ groups: response.data })
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  showGroupDetails: function(group){
    this.setState({ group: group })
    this.refs.modalShowGroup.handleOpen();
  },

  showAddGroupModal: function(){
    this.refs.modalAddGroup.handleOpen();
  },

  showSignInModal: function(){
    this.refs.modalSignIn.handleOpen();
  },

  showSignUpModal: function(){
    this.refs.modalSignUp.handleOpen();
  },

  render() {

    return (
      <div>
        <Header
          showAddGroupModal={this.showAddGroupModal}
          showSignInModal={this.showSignInModal}
          showSignUpModal={this.showSignUpModal}
        />
        <div className="container">
          <DisplayGroups groups={this.state.groups} showGroupDetails={this.showGroupDetails} />
          <ModalShowGroup
            ref='modalShowGroup'
            group={this.state.group}
            showModalState={this.state.showModalState}
          />
          <ModalAddGroup
            ref='modalAddGroup'
            reloadGroups={this.reloadGroups}
          />
          <ModalSignIn ref='modalSignIn' />
          <ModalSignUp ref='modalSignUp' />
        </div>
      </div>
    )
  }
});

export default MainBody;
