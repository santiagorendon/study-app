import React from "react";
import { withRouter, Route, Switch } from "react-router-dom";
import "./app.css";
import Login from "./Login";
import SignUp from "./SignUp";

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
      </Switch>
    </div>
  );
}
