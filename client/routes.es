import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './containers/home';
import Error404 from './components/error_404';
import Error500 from './components/error_500';


export default (
  <Switch>
    <Route path="/500" component={Error500} exact />
    <Route path="/404" component={Error404} exact />

    <Route path="/" component={Home} exact />
    <Route path="*" component={Error404} />
  </Switch>
);
