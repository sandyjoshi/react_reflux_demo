var localStorage = require('./localStorage');

var assert = require('assert');
var expect = require('expect');
var UserActions = require('../app/scripts/actions/userActions');
var UserStore = require('../app/scripts/stores/userStore');

describe('User Store', function() {

  it("is configured", function () {
    // expect(UserStore.listenables).to.include(UserActions);
    // expect(UserActions.addItem).to.be.a('function');
  });

  it('should contain newly added item', function () {
    UserStore.default.onAddItem({'name':'sandy', 'group' : [  ]});
    assert.equal(1, UserStore.default.totalUserItems.length);
    assert.equal('sandy', UserStore.default.totalUserItems[0].name);

  });

  it('should delete item', function () {
    assert.equal(1, UserStore.default.totalUserItems.length);
    assert.equal(1, UserStore.default.totalUserItems[0].id);
    UserStore.default.onDeleteItem(1);
    assert.equal(0, UserStore.default.totalUserItems.length);
  });

});