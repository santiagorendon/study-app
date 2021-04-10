

import React from "react";
import StudyRoom from './components/Pages/StudyRoom';
import { withRouter, Route, Switch } from "react-router-dom";
import "./app.css";
import Login from "./components/Pages/Home/Login";
import SignUp from "./components/Pages/Home/SignUp";
import Profile from "./components/Pages/Home/Profile";
import Home from "./components/Pages/Home";
import NotificationProvider from "../client/components/shared/Notifications";


export default function App() {
  return (

    <div>
      <NotificationProvider>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/" component={Home} />
          <Route exact path="/profile" component={Profile} />
          
          <Route exact path="/studyroom" component={StudyRoom} />
        </Switch>
      </NotificationProvider>
    </div>
  );

}
