import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Dashboard from './Containers/Dashboard/Dashboard'
import Login from '../src/Pages/Login/Login'
import Signup from './Pages/Signup/Signup';
import { PrivateRoute } from './PrivateRoutes';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route path="/signup" component={Signup}></Route>
        <PrivateRoute path="/" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
}
