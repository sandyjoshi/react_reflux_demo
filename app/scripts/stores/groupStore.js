import Reflux from 'reflux';
import GroupActions from '../actions/groupActions';
import saveLocalStorage from '../helpers/localStorage';


let GroupStore = Reflux.createStore({
  listenables: GroupActions,

  init() {

    let items = localStorage.getItem( "groups" ) ;
    this.totalGroupItems = items ? JSON.parse(items) : [] ;

    // this.totalGroupItems = [ { id : 1 , name : 'group_1' , users : [ { id : 2 , name : 'sandy' } ] } ,
    //  { id : 2 , name : 'group_2' , users : [ { id : 1 , name : 'sandeep' } ,{ id : 2 , name : 'sandy' } ] }];
  },

  onLoadItems() {
    this.trigger({
      totalGroupItems : this.totalGroupItems
    });
  },

  onAddItem(data){
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

    saveLocalStorage( [{ 'key' : 'groups' , 'val' : JSON.stringify(this.totalGroupItems) }] );
  },

  onDeleteItem(groupId){
    var index = this.totalGroupItems.findIndex( item => item.id == groupId);
    this.totalGroupItems.splice(index, 1);
    this.trigger({
      totalGroupItems : this.totalGroupItems
    });
    saveLocalStorage( [{ 'key' : 'groups' , 'val' : JSON.stringify(this.totalGroupItems) }] );
  },

  onDeleteUserFromAllGroup(userId){
    this.totalGroupItems.forEach(function (group) {
      let index = group.users.findIndex( item => item.id == userId);
      group.users.splice(index, 1);
    });
    this.trigger({
      totalGroupItems : this.totalGroupItems
    });
    saveLocalStorage( [{ 'key' : 'groups' , 'val' : JSON.stringify(this.totalGroupItems) }] );
  },

  onDeleteUserFromGroup(userId,groupId){
    var group = this.totalGroupItems.find( item => item.id == groupId);
    var index = group.users.findIndex( item => item.id == userId);
    group.users.splice(index, 1);
    this.trigger({
      totalGroupItems : this.totalGroupItems
    });
    saveLocalStorage( [{ 'key' : 'groups' , 'val' : JSON.stringify(this.totalGroupItems) }] );
  },

  onGetDetails(id){
    var data = this.totalGroupItems.find( item => item.id == id);
    this.trigger({
      groupUserItems : data.users ,
      groupId : data.id ,
      groupName : data.name
    });
  },

  onAddUserToGroup(data){
    var group = this.totalGroupItems.find( item => item.id == data.groupId);
    group.users.push( { id : data.userId , name : data.userName } ) ;
    this.trigger({
      groupUserItems : group.users ,
      groupId : group.id ,
      groupName : group.name
    });
    saveLocalStorage( [{ 'key' : 'groups' , 'val' : JSON.stringify(this.totalGroupItems) }] );
  }

});

export default GroupStore;