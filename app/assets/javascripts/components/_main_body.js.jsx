var MainBody = React.createClass({

    getInitialState() {
        return { 
          groups: [],
          group: null }
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

  render() {
    return (
      <div className="container">
          <DisplayGroups groups={this.state.groups} />
          <ModalAddGroup />
          <ModalShowGroup group={group} />

          <a className="btn-floating btn-large waves-effect waves-light modal-trigger red bnt-right-bottom" href="#modalAddGroup">
            <i className="material-icons">add</i>
          </a>
      </div>
    )
  }
});