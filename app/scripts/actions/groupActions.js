import Reflux from 'reflux';

const GroupActions = Reflux.createActions([
  'loadItems',
  'addItem',
  'getDetails',
  'deleteItem',
  'deleteUserFromGroup',
  'deleteUserFromAllGroup',
  'addUserToGroup'
]);

export default GroupActions;
