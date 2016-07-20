var MainBody = React.createClass({

  getInitialState() {
    return { 
      groups: [],
      group: {} 
    }
  },

  componentDidMount() {

    this.reloadGoups();
  },

  reloadGoups: function() {

    $.ajax({ 
      type: "GET",
      url: url_groups, 
      success: function(data) {        
        this.setState({ groups: data })
      }.bind(this)
    });
  },

  showGroupDetails(group){
    this.setState({ group: group })
    $('#modalShowGroup').openModal();
  },  

  showAddGroupModal(){
    $('#modalAddGroup').openModal();
  }, 

  render() {
    return (              
      <div className="container">
        <DisplayGroups groups={this.state.groups} showGroupDetails={this.showGroupDetails} />
        <ModalAddGroup reloadGoups={this.reloadGoups} />
        <ModalShowGroup group={this.state.group} />

        <a className="btn-floating btn-large waves-effect waves-light modal-trigger red bnt-right-bottom" href="#" onClick={this.showAddGroupModal}>
          <i className="material-icons">add</i>
        </a>
      </div>
    )
  }
});