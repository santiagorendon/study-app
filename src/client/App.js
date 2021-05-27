import React from "react";
import StudyRoom from "./components/Pages/StudyRoom";
import NavBar from "./components/shared/NavBar";
// import NavBar from './components/Home/NavBar';
import { withRouter, Route, Switch } from "react-router-dom";
import "./app.css";
import Login from "./components/Pages/Login";
import SignUp from "./components/Pages/SignUp";
import Profile from "./components/Pages/Profile";
import Team from "./components/Pages/Team";
import About from "./components/Pages/About";
import Courses from "./components/Pages/Courses";
import Resources from "./components/Pages/Resources";
import Home from "./components/Pages/Home";
import Messaging from "./components/Pages/StudyRoom/Messaging";
import NotificationProvider from "./components/shared/Notifications";
import UserProvider from "./components/shared/UserProvider";

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
            <Route exact path="/team" component={Team} />
            <Route exact path="/about" component={About} />
            <Route exact path="/courses" component={Courses} />
            <Route exact path="/resources" component={Resources} />
            {/* <Route exact path="/studyroom" component={StudyRoom} /> */}
            <Route exact path="/studyroom/:id" component={StudyRoom} />
          </Switch>
        </NotificationProvider>
      </UserProvider>
    </div>
  );
}
