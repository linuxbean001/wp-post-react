import React from 'react';
import './App.scss';
import { Route, Switch } from "react-router-dom";
import Login from './components/auth/Login';
import PrivateRoute from './helper/PrivateRoute';
import AppLayout from './components/layout/Layout';
import Signup from './components/auth/Signup';
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Switch>
        <Route path={'/'} exact component={Login}></Route>
        <Route path={'/signup'} exact component={Signup}></Route>
        <PrivateRoute path={'/dashboard'} component={AppLayout}/>
      </Switch>
    </div>
  );
}

export default App;
