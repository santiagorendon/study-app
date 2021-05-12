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
import { UserContext } from "../../shared/UserProvider";

const api = "http://localhost:8080";
const path = "/api/create-account";

function SignUp() {
  const history = useHistory();

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
      <form>
        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <Grid align="center">
              <Avatar style={avatarStyle}>
                <LockOutlinedIcon></LockOutlinedIcon>
              </Avatar>
              <h2 style={{ fontFamily: "Permanent Marker", fontSize: "20px" }}>
                Sign Up
              </h2>
            </Grid>
            <TextField
              label="Email"
              placeholder="Enter Your Email"
              name="email"
              onChange={(e) => handleEmail(e)}
              fullWidth
              required
            />
            <TextField
              label=" Create a Username"
              placeholder="Enter Username"
              onChange={(e) => handleUsername(e)}
              name="username"
              fullWidth
              required
            />
            <TextField
              label="Password"
              placeholder="Enter Password"
              onChange={(e) => handlePassword(e)}
              name="password"
              type="password"
              fullWidth
              required
            />
            <TextField
              label="Password"
              placeholder="Confirm Password"
              onChange={(e) => handleConfirmPassword(e)}
              name="confirmPassword"
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
              Sign Up{" "}
            </Button>
            <Typography>
              {" "}
              have an account
              <Link to="/login"> Login</Link>
            </Typography>
          </Paper>
        </Grid>
      </form>
    </div>
  );
}

export default SignUp;
