import React, { useState } from "react";
import { Button, Drawer, List, Divider, ListItem } from "@material-ui/core";
import { Redirect, Link } from "react-router-dom";

function NavBar() {
  const [state, setState] = useState(false);
  const navStyle = {
    backgroundColor: "pink",
    opacity: ".6",
    display: "flex",
    justifyContent: "space-around",
  };

  const buttonStyle = { position: "relative", top: "8.5px" };

  const toggleDrawer = (open) => (event) => {
    setState(open);
  };

  const handleLogout = () => {
    localStorage.clear();
  };

  const list = () => (
    <div onClick={toggleDrawer(false)}>
      <List>
        <ListItem>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            Home
          </Link>
        </ListItem>
        <ListItem>
          <Link
            to="/profile"
            style={{ textDecoration: "none", color: "black" }}
          >
            Profile
          </Link>
        </ListItem>

        {/* <ListItem>
          <Link to="/group" >
            create a group
          </Link>
        </ListItem> */}
        {/* {!localStorage.token && <Redirect to="/login" />}
        <ListItem button onClick={handleLogout}>
          Logout
        </ListItem> */}
      </List>
    </div>
  );

  return (
    <div style={navStyle}>
      <Button onClick={toggleDrawer(true)} style={buttonStyle}>
        Menu
      </Button>
      <Drawer anchor={"left"} open={state} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
}

export default NavBar;
