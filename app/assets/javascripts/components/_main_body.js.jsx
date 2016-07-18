var MainBody = React.createClass({

  getInitialState() {
    return { 
      groups: [],
      group: {} 
    }
  },

  componentDidMount() {

    $.ajax({ 
      type: "GET",
      dataType: "jsonp",
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

  render() {
    return (              
      <div className="container">
        <DisplayGroups groups={this.state.groups} showGroupDetails={this.showGroupDetails} />
        <ModalAddGroup />
        <ModalShowGroup group={this.state.group} />

        <a className="btn-floating btn-large waves-effect waves-light modal-trigger red bnt-right-bottom" href="#modalAddGroup">
          <i className="material-icons">add</i>
        </a>
      </div>
    )
  }
});