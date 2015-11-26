import React from 'react';
import UserStore from '../stores/userStore';
import UserActions from '../actions/userActions';
import GroupStore from '../stores/groupStore';
import GroupActions from '../actions/groupActions';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import SelectField from 'material-ui/lib/select-field';
import GroupItem from '../components/groupDetailsItem.jsx';

/**
 * GroupDetails component to show details of a particular group.
 */
const GroupDetails = React.createClass({

  getInitialState () {
    return {
      groupUserItems : [], // users assosiated to group
      totalUserItems : [], // total users
      remaingUsers : [],
      groupName : ''
    };
  },

  // Binding of data with the store.

  componentDidMount() {
    this.unsubUserItems = UserStore.listen(this.onStatusChange);
    UserActions.loadItems();
    this.unsubGroupDetails = UserStore.listen(this.onStatusChange);
    GroupActions.getDetails( this.props.params.groupId );
    this.unsubGroupItems = GroupStore.listen(this.onStatusChange);
    GroupActions.loadItems();
  },

  componentWillUnmount() {
    this.unsubUserItems();
    this.unsubGroupDetails();
    this.unsubGroupItems();
  },

  onStatusChange(state) {

    this.setState(state);
    // ToDo : filter should not be done all times.
    let members = this.state.groupUserItems.map(function (item) { return item.id });
    let remainingUserItems = this.state.totalUserItems.filter( item => members.indexOf(item.id) == -1) ;
    this.setState({ remaingUsers : remainingUserItems, userIndex : (remainingUserItems.length ? remainingUserItems[0].id : 0) })
  },

  onUserAddedToGroup() {
    var user = this.state.remaingUsers.find( item => item.id == this.state.userIndex);
    UserActions.addGroupToUser({
      'userId' : this.state.userIndex ,
      'groupId' :  this.state.groupId,
      'users' : this.state.groupUserItems,
      'name' : this.state.groupName
    });
    GroupActions.addUserToGroup({ 'groupId' : this.state.groupId , 'userId' :  this.state.userIndex , 'userName' : user.name });
  },

  onSelectValueChange(evt,index){
    this.setState({userIndex : index}) ;
  },

  render() {
    return (
      <div>
        <div className="card__container">
          <div className="card card__list">
            <div className="card-header"> Users of {this.state.groupName} </div>
            <div>
              {
                this.state.groupUserItems.map(function(item) {
                  return <GroupItem key={item.id} id={item.id} groupID={this.state.groupId} name={item.name} />
                },this)
              }
            </div>
          </div>
          <div className="card">
            <div className="card-header"> Add user to group {this.state.groupName} </div>
            <br/>
            <SelectField displayMember="name" valueMember="id" onChange={this.onSelectValueChange} disabled={!this.state.remaingUsers.length} menuItems={this.state.remaingUsers} />
            <br/>
            <RaisedButton label="ADD" onTouchTap={ this.onUserAddedToGroup } disabled={!this.state.remaingUsers.length} />
          </div>
        </div>
      </div>
    );
  }

});

export default GroupDetails;
