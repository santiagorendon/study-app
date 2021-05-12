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

  return (
    <div>
      <Grid>
        <List>
          <ListItem>About </ListItem>
          <ListItem>Resources </ListItem>
          <ListItem>Courses </ListItem>
          <ListItem>
            <Link to="/team" style={{ textDecoration: "none", color: "black" }}>
              {" "}
              Meet the Team
            </Link>
          </ListItem>
        </List>
      </Grid>
    </div>
  );
}

export default StaticMenu;
