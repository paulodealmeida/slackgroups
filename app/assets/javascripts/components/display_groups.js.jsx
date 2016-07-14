var DisplayGroups = React.createClass({

  render() {
    var groups = this.props.groups.map((group) => {
      return (

          <div className="col s12 m4">
            <div className="card small white">
              <div className="card-content grey-text text-darken-4">
                <span className="card-title">{group.title}</span>
                <p className="grey-text text-darken-2">{group.description}</p>
              </div>
              <div className="card-action">
                <a href={group.url}>{group.url}</a>
              </div>
            </div>
          </div>
      )
    });

    return(
      <div className="row">
        {groups}
      </div>
    )
  }
});