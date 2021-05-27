import React from "react";
import {
  Button,
  Drawer,
  List,
  Divider,
  ListItem,
  Paper,
  Grid,
  Box,
  TextField,
} from "@material-ui/core";
import { Redirect, Link } from "react-router-dom";

// import { UserProvider } from ".../.../shared/UserProvider/index";
// import { NotificationContext } from "../Notifications";

function StaticMenu() {
  // const { notification, setNotification } = useContext(NotificationContext);

  // const handleNotification = () => {
  //   setNotification({
  //     type: "info",
  //     message: "Please make an account or sign in to create a study room",
  //   });
  // };

  //run this by the group to see what should go in the static nav bar

  const fontStyle = {
    fontFamily: "'Roboto', sans-serif",
    fontSize: "20px",
  };

  return (
    <Grid
      item
      xs={3}
      style={{
        border: "10px",
        borderColor: "black",
        borderStyle: "solid",
        maxWidth: "15%",
      }}
    >
      <List style={fontStyle}>
        <ListItem>
          <Link to="/about" style={{ textDecoration: "none", color: "black" }}>
            About
          </Link>
        </ListItem>
        <ListItem>
          <Link
            to="/resources"
            style={{ textDecoration: "none", color: "black" }}
          >
            Resources
          </Link>
        </ListItem>
        <ListItem>
          <Link
            to="/courses"
            style={{ textDecoration: "none", color: "black" }}
          >
            Courses
          </Link>
        </ListItem>
        <ListItem>
          <Link to="/team" style={{ textDecoration: "none", color: "black" }}>
            {" "}
            Meet the Team
          </Link>
        </ListItem>
      </List>
    </Grid>
  );
}

export default StaticMenu;
