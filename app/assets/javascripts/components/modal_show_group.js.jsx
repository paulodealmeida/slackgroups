var ModalShowGroup = React.createClass({

  componentDidMount: function() {
  },

  close: function() {
    $('#modalShowGroup').closeModal();
  },

  render() {

    return(

      <div id="modalShowGroup" className="modal modal-fixed-footer">
        <div className="modal-content">
          <h4>{this.props.group.title}</h4>
          <p>{this.props.group.description}</p>
          <a href={this.props.group.link} target="_blank" className="link_group">{this.props.group.url}</a>
        </div>
        <div className="modal-footer">
          <a href="#" onClick={this.close} className="waves-effect waves-green btn-flat">Close</a>
        </div>
      </div>
    )
  }
});