import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import createHistory from 'history/lib/createHashHistory'

import App from './pages/app.jsx';
import User from './pages/user.jsx';
import UserDetails from './pages/userDetails.jsx';

import Group from './pages/group.jsx';
import GroupDetails from './pages/groupDetails.jsx';

const historyOptions = {
  queryKey : false
};

const routes = (
  <Router history={createHistory(historyOptions)}>
    <Route path='/' component={ App }>
      <IndexRoute component={ User }/>
      <Route path='group' component={ Group } />
      <Route path="group-details/:groupId" component={GroupDetails}/>
      <Route path='user' component={ User } />
      <Route path="user-details/:userId" component={UserDetails}/>
    </Route>
  </Router>
);

export default routes;