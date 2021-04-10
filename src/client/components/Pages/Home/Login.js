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

const api = "http://localhost:8080";
const path = "/login";

function Login() {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };
    fetch(api + path, request)
      .then((response) => response.json())
      .then((data) => authResponse(data));
  };

  const authResponse = (data) => {
    console.log(data);
    if (data.error) {
      alert(data.error);
    } else {
      const token = data.token;
      localStorage.token = token;
      history.push("/");
    }
  };

  return (
    <div>
      <form onSubmit={() => handleSubmit(e)}>
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
              type="submit"
              value="submit"
              background-color="white"
              fullWidth
              variant="contained"
              style={buttonStyle}
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