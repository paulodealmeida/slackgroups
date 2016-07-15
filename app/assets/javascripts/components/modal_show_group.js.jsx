var ModalShowGroup = React.createClass({

  componentDidMount: function() {
    $('.modal-trigger').leanModal();
  },

  render() {

    return(

      <div id="modalShowGroup" className="modal modal-fixed-footer">
        <div className="modal-content">
          <h4>{this.props.group.title}</h4>
          <p>{this.props.group.description}</p>
        </div>
        <div className="modal-footer">
          <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat ">Close</a>
        </div>
      </div>
    )
  }
});