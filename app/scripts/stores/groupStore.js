import Reflux from 'reflux';
import GroupActions from '../actions/groupActions';


let GroupStore = Reflux.createStore({
  listenables: GroupActions,

  getInitialState() {
    return this.list;
  },

  getDefaultData: function() {
     return this.list;
   },


  init() {
    this.totalGroupItems = [ { id : 1 , name : 'group_1' , users : [ { id : 2 , name : 'sandy' } ] } ,
     { id : 2 , name : 'group_2' , users : [ { id : 1 , name : 'sandeep' } ,{ id : 2 , name : 'sandy' } ] }];
  },

  onLoadItems() {
    // ToDO : API call required.
    this.trigger({
      totalGroupItems : this.totalGroupItems
    });
  },

  onAddItem(data){
    // ToDO : API call required which will return id of new user.
    if( this.totalGroupItems.length > 0 ){
      data.id = this.totalGroupItems[ this.totalGroupItems.length - 1 ].id + 1 ;
    }
    else{
      data.id = 1 ;
    }
    data.users = [];
    this.totalGroupItems.push(data);

    this.trigger({
      totalGroupItems : this.totalGroupItems
    });

  },

  onDeleteItem(groupId){
    var index = this.totalGroupItems.findIndex( item => item.id == groupId);
    this.totalGroupItems.splice(index, 1);
    this.trigger({
      totalGroupItems : this.totalGroupItems
    });

  },

  onDeleteUserFromAllGroup(userId){
    // ToDo : make an API call.
    this.totalGroupItems.forEach(function (group) {
      let index = group.users.findIndex( item => item.id == userId);
      group.users.splice(index, 1);
    });
    this.trigger({
      totalGroupItems : this.totalGroupItems
    });
  },

  onDeleteUserFromGroup(userId,groupId){
    // ToDo : make an API call.
    var group = this.totalGroupItems.find( item => item.id == groupId);
    var index = group.users.findIndex( item => item.id == userId);
    group.users.splice(index, 1);
    this.trigger({
      totalGroupItems : this.totalGroupItems
    });
  },

  onGetDetails(id){
    // ToDo : make an API call if user item contains more data then stored in list.
    var data = this.totalGroupItems.find( item => item.id == id);
    this.trigger({
      groupUserItems : data.users ,
      groupId : data.id ,
      groupName : data.name
    });
  },

  onAddUserToGroup(data){
    // ToDo : API call to save data.
    var group = this.totalGroupItems.find( item => item.id == data.groupId);
    group.users.push( { id : data.userId , name : data.userName } ) ;
    this.trigger({
      groupUserItems : group.users ,
      groupId : group.id ,
      groupName : group.name
    });
  }




});

export default GroupStore;