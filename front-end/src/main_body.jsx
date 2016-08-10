import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {red500} from 'material-ui/styles/colors';

import * as axios from 'axios';

import DisplayGroups from './display_groups';
import ModalShowGroup from './modal_show_group';
import ModalAddGroup from './modal_add_group';

var MainBody = React.createClass({

  getInitialState: function() {
    return {
      groups: [],
      group: {}
    }
  },

  componentDidMount() {
    this.reloadGoups();
  },

  reloadGoups: function() {

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

  render() {

    return (

      <div className="container">

        <DisplayGroups groups={this.state.groups} showGroupDetails={this.showGroupDetails} />
        <ModalShowGroup ref='modalShowGroup' group={this.state.group} showModalState={this.state.showModalState} />
        <ModalAddGroup ref='modalAddGroup' reloadGoups={this.reloadGoups} />

        <FloatingActionButton className="bnt-right-bottom" backgroundColor={red500} onClick={this.showAddGroupModal.bind(this)} >
          <ContentAdd />
        </FloatingActionButton>

      </div>
    )
  }
});

export default MainBody;
