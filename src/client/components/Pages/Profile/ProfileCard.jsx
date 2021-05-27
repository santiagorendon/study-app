import React from "react";
import {
  Paper,
  Avatar,
  Grid,
  Typography,
  Card,
  Button,
  CardContent,
  CardActions,
  CardActionArea,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const fontStyle = {
  fontFamily: "'Roboto', sans-serif",
  fontSize: "20px",
  paddingLeft: "5%",
  paddingBottom: "6%",
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(14),
    height: theme.spacing(14),
  },
}));

const ProfileCard = ({ openModal, user }) => {
  const classes = useStyles();

  const paperStyle2 = {
    margin: "2rem",
    maxWidth: "55%",
    display: "flex",
  };

  console.log(user);
  return (
    <div>
      <Grid item xs>
        <Paper elevation={5} style={paperStyle2}>
          <Grid align="center" style={fontStyle}>
            <h4 style={{ fontFamily: "Permanent Marker", paddingTop: "10px" }}>
              {" "}
              {user.username}
            </h4>
            <Avatar
              src="https://images.unsplash.com/photo-1548142813-c348350df52b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=635&q=80"
              className={classes.large}
            />
            <Typography style={{ paddingTop: "10px" }}>{user.bio}</Typography>
            <Button onClick={openModal} color="secondary">
              Edit Profile
            </Button>
          </Grid>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "end",
              paddingLeft: "10%",
              paddingTop: "23%",
            }}
          >
            <Typography style={{ paddingTop: "10px" }}>
              email: {user.email}
            </Typography>
            <Typography style={{ paddingTop: "10px" }}>
              major: {user.major}
            </Typography>
          </div>
        </Paper>
      </Grid>
    </div>
  );
};

export default ProfileCard;
