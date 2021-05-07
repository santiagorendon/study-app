import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  Paper,
  Grid,
  TextField,
  Button,
  Typography,
  Avatar,
} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {UserContext} from "./UserProvider"

const path = "/api/login";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);

  const paperStyle = {
    padding: 20,
    height: "50vh",
    width: 280,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "pink" };
  const buttonStyle = { margin: "8px 0" };

  const handleEmail = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `password=${password}&email=${email}`,
    };
    // if (password !== confirmPassword) {
    //   alert("passwords don't match");
    // } else {
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
          // const token = response["success"];
          const userData = response["success"];
          console.log(userData)
          localStorage.token = userData.id;
          setUser(userData);
          return response["success"];
        }
      });
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
      <form>
        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <Grid align="center">
              <Avatar style={avatarStyle}>
                <LockOutlinedIcon></LockOutlinedIcon>
              </Avatar>
              <h2>Sign In</h2>
            </Grid>
            <TextField
              label="Email"
              placeholder="Enter Email"
              name="email"
              onChange={(e) => handleEmail(e)}
              fullWidth
              required
            />
            <TextField
              label="Password"
              placeholder="Enter Password"
              onChange={(e) => handlePassword(e)}
              type="password"
              fullWidth
              required
            />
            <FormControlLabel
              control={<Checkbox name="checkedB" color="primary" />}
              label="Remember Me"
            />
            <Button
              value="submit"
              background-color="white"
              fullWidth
              variant="contained"
              style={buttonStyle}
              onClick={(e) => handleSubmit(e)}
            >
              {" "}
              Sign In{" "}
            </Button>
            <Typography>
              {" "}
              Don't have an account?
              <Link to="/signup">Sign Up</Link>
            </Typography>
          </Paper>
        </Grid>
      </form>
    </div>
  );
}

export default Login;
