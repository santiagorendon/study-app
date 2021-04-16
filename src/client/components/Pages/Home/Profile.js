import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Modal from "react-modal";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
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

const path = "/api/find-user";
function Profile() {
  const [user, setUser] = useState([]);
  const [major, setMajor] = useState("");
  const [bio, setBio] = useState("");
  const [courses, setCourses] = useState("");

  useEffect(() => {
    const id = localStorage.token;
    fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `id=${id}`,
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      });
  }, []);

  console.log(user);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const divStyle = {
    display: "flex",
    padding: "5px",
    margin: "5px",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "stretch",
  };

  const paperStyle2 = {
    padding: 20,
    height: "50vh",
    width: "75%",
    margin: "20px auto",
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  let defaultAge = "set your age";
  let defaultMajor = "set your major";
  let defaultBio = "create your bio";
  let defaultCourses = "what courses are you currently studying?";
  // fetch the user information here...
  console.log(user);
  const Profile = () => (
    <Grid xs>
      <Paper elevation={20} style={paperStyle2}>
        <Grid align="center">
          <h3>Profile</h3>
          <Grid align="center">
            <Avatar></Avatar>
          </Grid>
          <div>
            <h5>username: {user.username}</h5>
            <h5>email: {user.email}</h5>
            {/* <h5>age: {user.age === null ? defaultAge : user.age}</h5> */}
            <h5>Major: {user.major === null ? defaultMajor : user.major}</h5>
            <h5>Bio {user.bio === null ? defaultBio : user.bio}</h5>
            <h5>
              Courses: {user.courses === null ? "please work" : defaultCourses}
            </h5>
          </div>

          <Button onClick={openModal}> Edit Profile </Button>
        </Grid>
      </Paper>
    </Grid>
  );

  //ternary for the h5 tags t set a default value.

  const userStudyGroups = () => {
    return user.studyGroups.map((group) => (
      <Grid>
        <Card variant="outlined">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              {group.name}
            </Typography>
            <Typography variant="h5" component="h2">
              {group.bio}
            </Typography>

            <CardActions>
              <CardActionArea>
                <Button size="small">
                  <DeleteOutlineIcon></DeleteOutlineIcon>
                </Button>
              </CardActionArea>
            </CardActions>
          </CardContent>
        </Card>
      </Grid>
    ));
  };

  const handleChange = (e) => {
    if (e.target.name === "major") {
      setMajor(e.target.value);
    }
    if (e.target.name === "bio") {
      setBio(e.target.value);
    }
  };

  console.log("please find me", major);
  console.log("please find me again!", bio);

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   fetch(path, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded",
  //     },
  //     body: `id=${id}`,
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setUser(data);
  //     });
  // }

  return (
    <div>
      <div style={divStyle}>
        <div>
          <Grid xs={12}>
            <Paper elevation={20} style={paperStyle2}>
              <Grid align="center">
                <h4> User Study Groups</h4>
                {user.studyGroups >= 1
                  ? userStudyGroups()
                  : "you have no study groups"}
              </Grid>
            </Paper>
          </Grid>
        </div>
        <div>{Profile()}</div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h5>Edit Profile</h5>
        <form>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <TextField
              label="major"
              placeholder={user.major}
              name="major"
              onChange={(e) => handleChange(e)}
              // label="Email"
              // placeholder="Enter Your Email"
              // name="email"
              // onChange={(e) => handleEmail(e)}
              fullWidth
              required
            />
            <TextField
              label="bio"
              placeholder={user.bio}
              name="bio"
              onChange={(e) => handleChange(e)}
              fullWidth
              required
            />
            {/* <TextField
              name="courses"
              value="courses"
              onChange={(e) => handleChange(e)}
            />  */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              {/* <Button
                type="submit"
                color="secondary"
                onClick={(e) => handleSubmit(e)}
              > */}
              {/* Submit
              </Button> */}
              <Button onClick={closeModal} color="secondary">
                close
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Profile;
