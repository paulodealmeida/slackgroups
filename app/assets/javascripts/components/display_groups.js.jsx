var DisplayGroups = React.createClass({

  render() {

    var divStyle = {
      height: '200px'
    };

    var groups = this.props.groups.map((group) => {
      return (
        <div className="col s12 m4 l4">
          <div className="card small white">
            <div className="card-content grey-text text-darken-4">
              <a href="#" onClick={this.props.showGroupDetails.bind(null, group)}><span className="card-title">{group.title}</span></a>
              <p className="grey-text text-darken-2">{group.description}</p>
            </div>

            <div className="card-action">
              <a href={group.link} target="_blank">{group.url}</a>
            </div>
          </div>
        </div>
      )
    }.bind(this));

    return(
      <div className="row">
        {groups}
      </div>
    )
  }
});