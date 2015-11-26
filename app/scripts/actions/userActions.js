import Reflux from 'reflux';

const UserActions = Reflux.createActions([
  'loadItems',
  'addItem',
  'deleteItem',
  'getDetails',
  'deleteGroupFromUser',
  'addGroupToUser'
]);

export default UserActions;