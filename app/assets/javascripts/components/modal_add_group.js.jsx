var ModalAddGroup = React.createClass({

  componentDidMount: function() {
    $('.modal-trigger').leanModal();
  },

  render() {

    return(

      <div id="modalAddGroup" className="modal modal-fixed-footer">
        <div className="modal-content">
          <h4>Modal Header</h4>
          <p>A bunch of text</p>
        </div>
        <div className="modal-footer">
          <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat ">Agree</a>
        </div>
      </div>
    )
  }
});