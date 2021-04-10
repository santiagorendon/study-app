import React from "react";
import { withRouter, Route, Switch } from "react-router-dom";
import "./app.css";
import Login from "./Login";
import SignUp from "./SignUp";
import Home from './components/Pages/Home';
import NotificationProvider from '../client/components/shared/Notifications';

export default function App() {
  return (
    <div>
       <NotificationProvider>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/" component={Home} />
      </Switch>
    </NotificationProvider>
    </div>
  );

