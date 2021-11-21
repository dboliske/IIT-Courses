import React from 'react';
import ReactDOM from 'react-dom';
import { Route, HashRouter as Router, Switch } from 'react-router-dom';

import Main from './Home';
import CS201 from './201';
import CS331 from './331';
import NotFound from './NotFound';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={Main}/>
      <Route path="/201" component={CS201}/>
      <Route path="/201/*" component={CS201}/>
      <Route path="/331" component={CS331}/>
      <Route path="/331/*" component={CS331}/>
      <Route component={NotFound} />
    </Switch>
  </Router>,
  document.querySelector('#root'),
);