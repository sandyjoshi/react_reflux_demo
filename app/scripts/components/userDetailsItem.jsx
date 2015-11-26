import React from 'react';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/lib/raised-button';
import UserActions from '../actions/userActions';
import FlatButton from 'material-ui/lib/flat-button';
import GroupActions from '../actions/groupActions';


/**
 * UserDetailsItem component to show list items of UserDetails component.
 */
var UserDetailsItem = React.createClass({

  render() {
    return (
      <div className="item">
        <FlatButton linkButton={true} href={"/#/group-details/" + this.props.id} label={this.props.name}></FlatButton>
        <RaisedButton style={{'float':'right'}} label="Delete" onTouchTap={ this.onDeleteUserItem } disabled={this.props.disable} />
      </div>
    );
  },

  onDeleteUserItem() {
    UserActions.deleteGroupFromUser(this.props.userId, this.props.id);
    GroupActions.deleteUserFromGroup(this.props.userId,this.props.id);
  },

  propTypes : {
    name : React.PropTypes.string.isRequired ,
    id : React.PropTypes.number.isRequired
  }

});

export default UserDetailsItem;
