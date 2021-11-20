import React from 'react';
import ReactDOM from 'react-dom';
import { Route, HashRouter as Router, Switch } from 'react-router-dom';

import Main from './Home';
import CS201 from './201';
import CS331 from './331';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={Main}/>
      <Route path="/201" component={CS201}/>
      <Route path="/201/*" component={CS201}/>
      <Route path="/331" component={CS331}/>
      <Route path="/331/*" component={CS331}/>
      {/* <Route exact path="/syllabus" component={Syllabus}/>
      <Route exact path="/modules" component={Modules}/>
      <Route path="/lecture/:lect" component={Lecture} />
      <Route exact path="/review" component={Review}/>
      <Route exact path="/review/topic/:id" component={Topic}/>
      <Route exact path="/about" component={About}/>
      <Route exact path="/support" component={Support}/>

      <Route component={NotFound} /> */}
    </Switch>
  </Router>,
  document.querySelector('#root'),
);