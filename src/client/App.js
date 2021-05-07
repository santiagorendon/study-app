

import React from "react";
import StudyRoom from './components/Pages/StudyRoom';
import NavBar from './components/Pages/Home/NavBar'
// import NavBar from './components/Home/NavBar';
import { withRouter, Route, Switch } from "react-router-dom";
import "./app.css";
import Login from "./components/Pages/Home/Login";
import SignUp from "./components/Pages/Home/SignUp";
import Profile from "./components/Pages/Profile";
import Home from "./components/Pages/Home";
import Messaging from "./components/Pages/StudyRoom/Messaging";
import NotificationProvider from "../client/components/shared/Notifications";
import UserProvider from "./components/Pages/Home/UserProvider"


export default function App() {
  return (

    <div>
      <UserProvider>
        <NotificationProvider>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/messaging" component={Messaging} />
            {/* <Route exact path="/studyroom" component={StudyRoom} /> */}
            <Route exact path="/studyroom/:id" component={StudyRoom} />
          </Switch>
        </NotificationProvider>
      </UserProvider>
    </div>
  );

}
