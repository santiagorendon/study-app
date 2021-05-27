import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  Paper,
  Grid,
  TextField,
  Button,
  Typography,
  Avatar,
  CssBaseline,
} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { UserContext } from "../../shared/UserProvider";
import { makeStyles } from "@material-ui/core/styles";

const api = "http://localhost:8080";
const path = "/api/create-account";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://images.unsplash.com/photo-1600195077077-7c815f540a3d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=636&q=80)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#EA5843",
    opacity: 0.6,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignUp() {
  const history = useHistory();
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const { setUser } = useContext(UserContext);

  const paperStyle = {
    padding: 20,
    height: "50vh",
    width: 280,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#EA5843", opacity: 0.6 };
  const buttonStyle = { margin: "8px 0" };

  const handleEmail = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };

  const handleUsername = (e) => {
    console.log(e.target.value);
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    console.log(e.target.value);
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `username=${username}&password=${password}&confirmPassword=${confirmPassword}&email=${email}`,
    };
    if (password !== confirmPassword) {
      alert("passwords don't match");
    } else {
      fetch(path, request)
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          console.log(response);
          if (response["error"]) {
            alert(response["error"]);
          } else {
            history.push("/");
            const userData = response["success"];
            console.log(userData);
            localStorage.token = userData.id;
            setUser(userData);
            // const token = response["success"];
            // localStorage.token = token;
            return response["success"];
          }
        });
    }
  };

  // const authResponse = (data) => {
  //   console.log(data);
  //   if (data.error) {
  //     alert(data.error);
  //   } else {
  //     const token = data.token;
  //     localStorage.token = token;
  //     history.push("/");
  //   }
  // };

  return (
    <div>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              component="h1"
              variant="h5"
              style={{ fontFamily: "Permanent Marker", fontSize: "20px" }}
            >
              Sign Up
            </Typography>
            <form className={classes.form}>
              <TextField
                variant="outlined"
                margin="normal"
                label="Email"
                placeholder="Enter Your Email"
                name="email"
                onChange={(e) => handleEmail(e)}
                fullWidth
                required
              />
              <TextField
                variant="outlined"
                margin="normal"
                label=" Create a Username"
                placeholder="Enter Username"
                onChange={(e) => handleUsername(e)}
                name="username"
                fullWidth
                required
              />
              <TextField
                variant="outlined"
                margin="normal"
                label="Password"
                placeholder="Enter Password"
                onChange={(e) => handlePassword(e)}
                name="password"
                type="password"
                fullWidth
                required
              />
              <TextField
                variant="outlined"
                margin="normal"
                label="Password"
                placeholder="Enter Password"
                onChange={(e) => handleConfirmPassword(e)}
                type="password"
                fullWidth
                required
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{ backgroundColor: "#F7D646" }}
                onClick={(e) => handleSubmit(e)}
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/login" variant="body2">
                    {"Have an account? Login Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default SignUp;
