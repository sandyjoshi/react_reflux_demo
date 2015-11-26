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

  // getInitialState() {
  //   return this.list;
  // },

  onLoadItems() {
    // ToDO : API call required.
    this.trigger({
      totalUserItems : this.totalUserItems
    });
  },

  onAddItem(data){
    // ToDO : API call required which will return id of new user.
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
    // ToDo : make an API call.
    var index = this.totalUserItems.findIndex( item => item.id == id);
    this.totalUserItems.splice(index, 1);
    this.trigger({
      totalUserItems : this.totalUserItems
    });
    saveLocalStorage( [{ 'key' : 'users' , 'val' : JSON.stringify(this.totalUserItems) }] );
  },

  onDeleteGroupFromUser(userId,groupId){
    // ToDo : make an API call.
    var user = this.totalUserItems.find( item => item.id == userId);
    var index = user.group.findIndex( item => item.id == groupId);
    user.group.splice(index, 1);
    this.trigger({
      totalUserItems : this.totalUserItems
    });
    saveLocalStorage( [{ 'key' : 'users' , 'val' : JSON.stringify(this.totalUserItems) }] );

  },


  onGetDetails(id){
    // ToDo : make an API call if user item contains more data then stored in list.
    var data = this.totalUserItems.find( item => item.id == id);
    this.trigger( {
      userGroupItems : data.group ,
      userId : data.id ,
      userName : data.name
    });
  },

  onAddGroupToUser(data){
    // ToDo : API call to save data.
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