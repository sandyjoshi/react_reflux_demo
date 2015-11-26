import React from 'react';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/lib/raised-button';
import GroupActions from '../actions/groupActions';
import FlatButton from 'material-ui/lib/flat-button';

/**
 * GroupItem component to show list items of Group component.
 */
var GroupItem = React.createClass({

  render() {
    return (
      <div className="item">
        <FlatButton linkButton={true} href={"/#/group-details/" + this.props.id} label={this.props.name}></FlatButton>
        <RaisedButton style={{'float':'right'}} label="Delete" onTouchTap={ this.onDeleteUserItem } disabled={this.props.disable} />
      </div>
    );
  },

  onDeleteUserItem() {
    GroupActions.deleteItem( this.props.id);
  },

  propTypes : {
    name : React.PropTypes.string.isRequired ,
    id : React.PropTypes.number.isRequired
  }

});

export default GroupItem;
