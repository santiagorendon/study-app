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

  return (
    <div>
      <Grid>
        <Paper>
          <div>What even goes here?</div>
        </Paper>
      </Grid>
    </div>
  );
}

export default StaticMenu;
