import React from 'react';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

var DisplayGroups = React.createClass({

  render() {

    const CardTextStyle = {
      height: '80px',
      overflow: 'hidden'
    };

    const CardTitleStyle = {
      paddingBottom: '0'
    };

    const CardStyle = {
      marginTop: '10px'
    };

    var groups = this.props.groups.map((group) => {
      return (

        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3">
          <Card style={CardStyle}>
            <CardTitle title={group.title} style={CardTitleStyle} onClick={this.props.showGroupDetails.bind(null, group)} className="clickable" />
            <CardText style={CardTextStyle}>
              <div>
                {group.description} 
              </div>
            </CardText>
            <CardActions>
              <a href={group.link} className="link_group">{group.url}</a>
            </CardActions>
          </Card>
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

export default DisplayGroups;