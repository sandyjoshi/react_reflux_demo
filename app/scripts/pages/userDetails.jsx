import React from 'react';
import UserStore from '../stores/userStore';
import UserActions from '../actions/userActions';
import GroupStore from '../stores/groupStore';
import GroupActions from '../actions/groupActions';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import SelectField from 'material-ui/lib/select-field';
import GroupItem from '../components/userDetailsItem.jsx';

/**
 * UserDetails component to show details of a particular user.
 */
const UserDetails = React.createClass({

  getInitialState() {
    return {
      userGroupItems : [], // group items assosiated to user
      totalGroupItems : [], // total groups
      remaingGroup : [],
      userName : '' ,
    };
  },

  // Binding of data with the store.
  componentDidMount() {
    this.unsubUserItems = UserStore.listen(this.onStatusChange);
    UserActions.loadItems();
    this.unsubUserDetails = UserStore.listen(this.onStatusChange);
    UserActions.getDetails( this.props.params.userId );
    this.unsubGroupItems = GroupStore.listen(this.onStatusChange);
    GroupActions.loadItems();
  },

  componentWillUnmount() {
    this.unsubUserItems();
    this.unsubUserDetails();
    this.unsubGroupItems();
  },

  onStatusChange(state) {
    this.setState(state);
    // toDO : filter properly.
    let usedGroup = this.state.userGroupItems.map(function (item) { return item.id });
    let remainingGroupItems = this.state.totalGroupItems.filter( item => usedGroup.indexOf(item.id) == -1) ;
    this.setState({ remaingGroup : remainingGroupItems });
    this.setState({ groupIndex : (remainingGroupItems.length ? remainingGroupItems[0].id : 0) })

  },

  onGroupAdded() {
    let group = this.state.remaingGroup.find( item => item.id == this.state.groupIndex);
    UserActions.addGroupToUser({ 'userId' : this.state.userId , 'groupId' :  group.id , name : group.name  });
    GroupActions.addUserToGroup({ 'groupId' : group.id , 'userId' :  this.state.userId , 'userName' : this.state.userName });
  },

  onSelectValueChange(evt,index){
    this.setState({groupIndex : index}) ;
  },

  render() {
    return (
      <div>
        <div className="card__container">
          <div className="card card__list">
            <div className="card-header"> Groups of {this.state.userName} </div>
            <div>
              {
                this.state.userGroupItems.map(function(item) {
                  return <GroupItem key={item.id} userId={this.state.userId} id={item.id} disable={(this.state.userGroupItems.length > 1 )? false : true } name={item.name} />
                },this)
              }
            </div>
          </div>
          <div className="card">
            <div className="card-header"> Add group to user {this.state.userName} </div>
            <br/>
            <SelectField displayMember="name" valueMember="id" onChange={this.onSelectValueChange} disabled={!this.state.remaingGroup.length} menuItems={this.state.remaingGroup} />
            <br/>
            <RaisedButton label="ADD" onTouchTap={ this.onGroupAdded } disabled={!this.state.remaingGroup.length} />
          </div>
        </div>
      </div>
    );
  }
});

export default UserDetails;
