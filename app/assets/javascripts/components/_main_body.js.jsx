var MainBody = React.createClass({

    getInitialState() {
        return { groups: [] }
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
      </div>
    )
  }
});