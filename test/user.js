var localStorage = require('./localStorage');

var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;
import UserActions from '../app/scripts/actions/userActions';
import UserStore from '../app/scripts/stores/userStore';

var unsubscribe;

describe('User Store', function() {

  afterEach(function () {
      if (unsubscribe)
          unsubscribe();
  });


  it("is configured", function () {
    expect(UserStore.listenables).to.include(UserActions);
    expect(UserActions.addItem).to.be.a('function');
  });

  it('should contain newly added item', function () {
    UserStore.onAddItem({'name':'sandy', 'group' : [ { name : 'group 1' , id : 1 } ]});
    assert.equal(1, UserStore.totalUserItems.length);
    assert.equal('sandy', UserStore.totalUserItems[0].name);

  });

  it('should trigger details of required user', function () {
    assert.equal(1, UserStore.totalUserItems.length);
    assert.equal(1, UserStore.totalUserItems[0].id);

    unsubscribe = UserStore.listen(function (keys) {
      assert.equal(1, keys.userId);
    });

    UserStore.onGetDetails(1);

  });

  it('should delete group from user', function () {
    assert.equal(1, UserStore.totalUserItems.length);
    assert.equal(1, UserStore.totalUserItems[0].id);
    assert.equal(1, UserStore.totalUserItems[0].group.length);
    assert.equal(1, UserStore.totalUserItems[0].group[0].id);

    UserStore.onDeleteGroupFromUser(1,1);
    assert.equal(1, UserStore.totalUserItems.length);
    assert.equal(0, UserStore.totalUserItems[0].group.length);

  });

  it('should add group to user', function () {
    assert.equal(1, UserStore.totalUserItems.length);
    assert.equal(1, UserStore.totalUserItems[0].id);
    assert.equal(0, UserStore.totalUserItems[0].group.length);

    UserStore.onAddGroupToUser({ userId : 1 , name : 'group 2' , groupId : 2});
    assert.equal(1, UserStore.totalUserItems.length);
    assert.equal(1, UserStore.totalUserItems[0].group.length);
    assert.equal('group 2', UserStore.totalUserItems[0].group[0].name);

  });


  it('should delete user', function () {
    assert.equal(1, UserStore.totalUserItems.length);
    assert.equal(1, UserStore.totalUserItems[0].id);
    UserStore.onDeleteItem(1);
    assert.equal(0, UserStore.totalUserItems.length);
  });


});

