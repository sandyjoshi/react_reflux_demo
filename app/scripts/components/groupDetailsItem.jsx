import React from 'react';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/lib/raised-button';
import GroupActions from '../actions/groupActions';
import UserActions from '../actions/userActions';
import FlatButton from 'material-ui/lib/flat-button';

/**
 * GroupDetailsItem component to show list items of GroupDetails component.
 */
const GroupDetailsItem = React.createClass({

  render() {
    return (
      <div className="item">
        <FlatButton linkButton={true} href={"/#/user-details/" + this.props.id} label={this.props.name}></FlatButton>
        <RaisedButton style={{'float':'right'}} label="Delete" onTouchTap={ this.onDeleteGroupItem } disabled={this.props.disable} />
      </div>
    );
  },

  onDeleteGroupItem() {
    GroupActions.deleteUserFromGroup( this.props.id , this.props.groupID);
    UserActions.deleteGroupFromUser(this.props.id , this.props.groupID);
  },

  propTypes : {
    name : React.PropTypes.string.isRequired ,
    id : React.PropTypes.number.isRequired
  }

});

export default GroupDetailsItem;
