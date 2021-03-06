import React from 'react';
import UserStore from '../stores/userStore';
import UserActions from '../actions/userActions';
import GroupStore from '../stores/groupStore';
import GroupActions from '../actions/groupActions';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import SelectField from 'material-ui/lib/select-field';
import UserItem from '../components/userItem.jsx';

/**
 * User component contains list of the user items.
 */
const User = React.createClass({

  getInitialState() {
    return {
      totalUserItems : [],
      totalGroupItems : [],
      searchedItems : [],
      newUserName :'',
      filterString : '',
      errorText : ''
    };
  },

  // Binding of data with the store.
  componentDidMount() {
    this.unsubUserItems = UserStore.listen(this.onStatusChange);
    UserActions.loadItems();
    this.unsubGroupItems = GroupStore.listen(this.onStatusChange);
    GroupActions.loadItems();
  },

  componentWillUnmount() {
    this.unsubUserItems();
    this.unsubGroupItems();
  },

  onStatusChange(state) {
    let newState = state ;
    if( state.totalGroupItems && state.totalGroupItems.length ){
      let groupIndex = state.totalGroupItems[0].id ;
      let groupName = state.totalGroupItems[0].name ;
      newState = Object.assign(newState, { 'groupIndex' : groupIndex , 'groupName' : groupName });
    }

    if( state.totalUserItems && state.totalUserItems.length ){
      let members = state.totalUserItems.filter( item => item.name.toLowerCase().indexOf( this.state.filterString.toLowerCase()) > -1 );
      newState = Object.assign(newState, { 'searchedItems' : members });
    }

    this.setState( newState );
  },

  /**
   * new user added
   */
  onUserAdded() {
    if( !this.state.newUserName  ){
      this.setState({errorText : "Please add User name."});
      return;
    }
    UserActions.addItem({ 'name' : this.state.newUserName , 'group' : [ { id : this.state.groupIndex , name : this.state.groupName } ] });
    this.refs.userName.clearValue();
    this.setState({ newUserName : '' });

  },

  /**
   * on input value change, update the state
   */
  onInputChange(evt){
    this.setState({ newUserName : evt.target.value });
    if( !evt.target.value ){
      this.setState({errorText : "Please add User name."});
    }
    else{
      this.setState({errorText : ""});
    }
  },

  /**
   * on group select value change, update the state
   */
  onSelectValueChange(evt,index,data){
    this.setState({groupIndex : index, groupName : data.name }) ;
  },

  /**
   * search accordingly to filter applied.
   */
  onSearchTextChange(evt){
    let searchText = evt.target.value;

    let members = this.state.totalUserItems.filter( item => item.name.toLowerCase().indexOf( searchText.toLowerCase()) > -1 );
    this.setState( { filterString : searchText , searchedItems : members } );

  },

  render() {
    return (
      <div>
        <div className="card__container">
          <div className="card card__list">
            <div className="card-header"> Search User </div>
            <TextField hintText="Search User Text" onChange={this.onSearchTextChange} />
              { this.state.searchedItems.length ?
                <div >
                {
                  this.state.searchedItems.map(function(item) {
                    return <UserItem key={item.id} id={item.id} name={item.name} />
                  })
                }
                </div> : null
              }
          </div>
          <div className="card">
            <div className="card-header"> Add User </div>
            <TextField ref="userName" hintText="User Name" errorText={this.state.errorText} onChange={this.onInputChange} />
            <br/>
            <SelectField displayMember="name" valueMember="id" onChange={this.onSelectValueChange} menuItems={this.state.totalGroupItems} />
            <br/>
            <RaisedButton label="ADD" onTouchTap={ this.onUserAdded }  />
          </div>
        </div>
      </div>

    );
  }

});

export default User;
