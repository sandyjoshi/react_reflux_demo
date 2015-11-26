import Reflux from 'reflux';
import UserActions from '../actions/userActions';
import GroupActions from '../actions/groupActions';
import saveLocalStorage from '../helpers/localStorage';


let UserStore = Reflux.createStore({
  listenables: UserActions,

  init() {

    let items = localStorage.getItem( "users" ) ;
    this.totalUserItems = items ? JSON.parse(items) : [] ;
    // this.totalUserItems = [{ id : 1 , name : 'sandeep' , group : [ { id : 2, name : 'group_2' } ] },
    //  { id : 2 , name : 'sandy' , group : [ { id : 1 , name : 'group_1' } , { id : 2 , name : 'group_2' } ] }];
  },

  onLoadItems() {
    this.trigger({
      totalUserItems : this.totalUserItems
    });
  },

  onAddItem(data){
    if( this.totalUserItems.length > 0 ){
      data.id = this.totalUserItems[ this.totalUserItems.length - 1 ].id + 1 ;
    }
    else{
      data.id = 1 ;
    }
    this.totalUserItems.push(data);

    if( data.group && data.group.length ){
      GroupActions.addUserToGroup({ groupId : data.group[0].id , userName : data.name, userId : data.id });
    }

    this.trigger({
      totalUserItems : this.totalUserItems
    });
    saveLocalStorage( [{ 'key' : 'users' , 'val' : JSON.stringify(this.totalUserItems) }] );
  },

  deleteItem(id){
    var index = this.totalUserItems.findIndex( item => item.id == id);
    this.totalUserItems.splice(index, 1);
    this.trigger({
      totalUserItems : this.totalUserItems
    });
    saveLocalStorage( [{ 'key' : 'users' , 'val' : JSON.stringify(this.totalUserItems) }] );
  },

  onDeleteGroupFromUser(userId,groupId){
    var user = this.totalUserItems.find( item => item.id == userId);
    var index = user.group.findIndex( item => item.id == groupId);
    user.group.splice(index, 1);
    this.trigger({
      totalUserItems : this.totalUserItems
    });
    saveLocalStorage( [{ 'key' : 'users' , 'val' : JSON.stringify(this.totalUserItems) }] );

  },

  onGetDetails(id){
    var data = this.totalUserItems.find( item => item.id == id);
    this.trigger( {
      userGroupItems : data.group ,
      userId : data.id ,
      userName : data.name
    });
  },

  onAddGroupToUser(data){
    var user = this.totalUserItems.find( item => item.id == data.userId);
    user.group.push( { id : data.groupId , name : data.name } ) ;
    this.trigger( {
      userGroupItems : user.group ,
      userId : user.id ,
      userName : user.name
    });
    saveLocalStorage( [{ 'key' : 'users' , 'val' : JSON.stringify(this.totalUserItems) }] );
  }

});

export default UserStore;