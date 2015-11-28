
import localStorage from './localStorage';

var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;
import GroupActions from '../app/scripts/actions/groupActions';
import GroupStore from '../app/scripts/stores/groupStore';

var unsubscribe;

describe('Group Store', function() {

  afterEach(function () {
      if (unsubscribe)
          unsubscribe();
  });


  it("is configured", function () {
    expect(GroupStore.listenables).to.include(GroupActions);
    expect(GroupActions.loadItems).to.be.a('function');
    expect(GroupActions.addItem).to.be.a('function');
    expect(GroupActions.getDetails).to.be.a('function');
    expect(GroupActions.deleteItem).to.be.a('function');
    expect(GroupActions.deleteUserFromGroup).to.be.a('function');
    expect(GroupActions.deleteUserFromAllGroup).to.be.a('function');
    expect(GroupActions.addUserToGroup).to.be.a('function');
  });

  it('should contain newly added group item', function () {
    GroupStore.onAddItem({'name':'group 1', 'users' : [ { name : 'sandeep' , id : 1 } ]});
    assert.equal(1, GroupStore.totalGroupItems.length);
    assert.equal('group 1', GroupStore.totalGroupItems[0].name);

  });

  it('should trigger details of required group', function () {
    assert.equal(1, GroupStore.totalGroupItems.length);
    assert.equal(1, GroupStore.totalGroupItems[0].id);

    unsubscribe = GroupStore.listen(function (keys) {
      assert.equal(1, keys.groupId);
    });

    GroupStore.onGetDetails(1);

  });

  it('should delete user from group', function () {
    assert.equal(1, GroupStore.totalGroupItems.length);
    assert.equal(1, GroupStore.totalGroupItems[0].id);
    assert.equal(1, GroupStore.totalGroupItems[0].users.length);
    assert.equal(1, GroupStore.totalGroupItems[0].users[0].id);
    GroupStore.onDeleteUserFromGroup(1,1);
    assert.equal(1, GroupStore.totalGroupItems.length);
    assert.equal(0, GroupStore.totalGroupItems[0].users.length);

  });


  it('should add user to group', function () {
    assert.equal(1, GroupStore.totalGroupItems.length);
    assert.equal(1, GroupStore.totalGroupItems[0].id);
    assert.equal(0, GroupStore.totalGroupItems[0].users.length);
    GroupStore.onAddUserToGroup({ userId : 1 , userName : 'sandy' , groupId : 1});
    assert.equal(1, GroupStore.totalGroupItems.length);
    assert.equal(1, GroupStore.totalGroupItems[0].users.length);
    assert.equal('sandy', GroupStore.totalGroupItems[0].users[0].name);

  });

  it('should delete group', function () {
    assert.equal(1, GroupStore.totalGroupItems.length);
    assert.equal(1, GroupStore.totalGroupItems[0].id);
    GroupStore.onDeleteItem(1);
    assert.equal(0, GroupStore.totalGroupItems.length);
  });

  it('should delete user from all group', function () {

    GroupStore.onAddItem({'name':'group 1', 'users' : [ { name : 'sandeep' , id : 1 } ]});
    GroupStore.onAddItem({'name':'group 2', 'users' : [ { name : 'sandeep' , id : 1 } ]});
    assert.equal(2, GroupStore.totalGroupItems.length);
    assert.equal(1, GroupStore.totalGroupItems[0].id);
    assert.equal(1, GroupStore.totalGroupItems[0].users.length);
    assert.equal(1, GroupStore.totalGroupItems[0].users[0].id);
    assert.equal(2, GroupStore.totalGroupItems[1].id);
    assert.equal(1, GroupStore.totalGroupItems[1].users.length);
    assert.equal(1, GroupStore.totalGroupItems[1].users[0].id);
    GroupStore.onDeleteUserFromAllGroup(1);
    assert.equal(2, GroupStore.totalGroupItems.length);
    assert.equal(0, GroupStore.totalGroupItems[0].users.length);
    assert.equal(0, GroupStore.totalGroupItems[1].users.length);

  });


});

