import React from 'react';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/lib/raised-button';
import UserActions from '../actions/userActions';
import FlatButton from 'material-ui/lib/flat-button';
import GroupActions from '../actions/groupActions';

/**
 * UserItem component to show list items of User component.
 */
const UserItem = React.createClass({

  render() {
    return (
      <div className="item">
        <FlatButton linkButton={true} href={"/#/user-details/" + this.props.id} label={this.props.name}></FlatButton>
        <RaisedButton style={{'float':'right'}} label="Delete" onTouchTap={ this.onDeleteUserItem }  />
      </div>
    );
  },

  onDeleteUserItem() {
    UserActions.deleteItem( this.props.id);
    GroupActions.deleteUserFromAllGroup(this.props.id);
  },

  propTypes : {
    name : React.PropTypes.string.isRequired ,
    id : React.PropTypes.number.isRequired
  }

});

export default UserItem;
