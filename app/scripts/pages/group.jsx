import React from 'react';
import UserStore from '../stores/userStore';
import GroupStore from '../stores/groupStore';
import GroupActions from '../actions/groupActions';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import GroupItem from '../components/groupItem.jsx';

/**
 * Group component contains list of group items.
 */
const Group = React.createClass({

  getInitialState() {
    return {
      totalGroupItems : [],
      newGroupName :'',
      errorText : ''
    };
  },

  // Binding of data with the store.
  componentDidMount() {
    this.unsubscribe = GroupStore.listen(this.onStatusChange);
    GroupActions.loadItems();
  },

  componentWillUnmount() {
    this.unsubscribe();
  },

  onStatusChange(state) {
    this.setState(state);
  },
  /**
   * add new group
   */
  onGroupAdded() {
    if( !this.state.newGroupName  ){
      this.setState({errorText : "Please add group name."});
      return;
    }
    GroupActions.addItem({ 'name' : this.state.newGroupName });
    this.refs.groupName.clearValue();
    this.setState({ newGroupName : "" }) ;
  },
  /**
   * on input value changed
   */
  onInputChange(evt){
    this.setState({ newGroupName : evt.target.value });

    if( !evt.target.value  ){
      this.setState({errorText : "Please add group name."});
    }
    else{
      this.setState({errorText : ""});
    }
  },

  render() {
    return (
      <div>
        <div className="card__container">
          <div className="card card__list">
            <div className="card-header"> Group List </div>
              <div >
              {
                this.state.totalGroupItems.map(function(item) {
                  return <GroupItem key={item.id} id={item.id} disable={item.users.length == 0 ?false:true} name={item.name} />
                })
              }
            </div>
          </div>
          <div className="card">
            <div className="card-header"> Add Group </div>
            <TextField ref="groupName" hintText="Group Name" errorText={this.state.errorText} onChange={this.onInputChange} />
            <br/>
            <RaisedButton label="ADD" onTouchTap={ this.onGroupAdded }  />
          </div>
        </div>
      </div>

    );
  }

});

export default Group;
