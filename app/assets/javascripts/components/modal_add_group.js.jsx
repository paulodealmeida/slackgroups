var ModalAddGroup = React.createClass({

  getInitialState: function() {
    return { 
      errors: [],
      erro1: true
    }
  },

  componentDidMount: function() {
  },

  addNewGroup: function() {
    var title = this.refs.title.value;
    var description = this.refs.description.value;
    var url = this.refs.url.value;

    var group = { title: title, description: description, url: url }

    if (this.validateFields(group)) {
      $.ajax({
        url: url_groups,
        type: 'POST',
        data: { group: group },
        success: (group) => {
          this.props.reloadGoups();
          $('#modalAddGroup').closeModal();
          this.clearFormValues();
        }.bind(this)
      });
    }
  },

  validateFields: function(group) {
    var errors = [];
    if (group.title == null || group.title.length < 2) {
      errors.push('title');
    }
    if (group.url == null || !this.validateURL(group.url)) {
      errors.push('url');
    }
    this.setState({ errors: errors })
    return errors.length <= 0;
  },

  validateURL: function(textval) {
    var urlregex = /^([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    return urlregex.test(textval);
  },

  clearFormValues: function() {
    this.refs.title.value = "";
    this.refs.description.value = "";
    this.refs.url.value = "";
  },

  render() {

    return(

      <form id="modalAddGroup" className="modal modal-fixed-footer">
        <div className="modal-content">

          <div className="row">
            <div className="input-field col s12 m12 l12">
              <input placeholder="Title of slackgroup" id="add_title" type="text" ref="title" />
              <label htmlFor="add_title">Title</label>
              { this.state.errors.indexOf('title') > -1 ? <div className="input-error">You must enter 2 characters minimum</div> : null }
            </div>
            
            <div className="input-field col s12 m12 l12">
              <textarea id="add_description" className="materialize-textarea" ref="description"></textarea>
              <label htmlFor="add_description">Add description</label>
              { this.state.errors.indexOf('description') > -1 ? <div className="input-error">You must enter a valid description</div> : null }
            </div>

            <div className="input-field col s12 m12 l12">
              <input placeholder="Url of slackgroup" id="add_url" type="text" ref="url" />
              <label htmlFor="add_url">Url</label>
              { this.state.errors.indexOf('url') > -1 ? <div className="input-error">You must enter a valid url</div> : null }
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <a href="#!" className="modal-action waves-effect waves-green btn-flat" onClick={this.addNewGroup}>Add</a>
          <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Cancel</a>
        </div>
      </form>
    )
  }
});