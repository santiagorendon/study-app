import React, { useEffect, useState , useContext} from "react";
import NavBar from "./NavBar";
import Modal from "react-modal";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { UserContext } from './UserProvider';
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
  const { user, setUser } = useContext(UserContext);
  // const [user, setUser] = useState([]);
  const [major, setMajor] = useState("");
  const [bio, setBio] = useState("");
  const [study, setStudy] = useState([]);

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
    justifyContent: "center",
    flexGrow: 1,
    width: "100%",
  };

  const paperStyle2 = {
    padding: "20%",
    height: "50vh",
    width: "280%",
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
    <Grid>
      <Paper elevation={10} style={paperStyle2}>
        <Grid align="center">
          <h3>Profile</h3>
          <Grid>
            <Avatar></Avatar>
          </Grid>
          <div>
            <h5>username: {user.username}</h5>
            <h5>email: {user.email}</h5>
            <h5>Major: {user.major === null ? defaultMajor : user.major}</h5>
            <h5>Bio: {user.bio === null ? defaultBio : user.bio}</h5>
            {/* <h5>
              Courses: {user.courses === null ? "please work" : defaultCourses}
            </h5> */}
          </div>

          <Button onClick={openModal} color="secondary">
            {" "}
            Edit Profile{" "}
          </Button>
        </Grid>
      </Paper>
    </Grid>
  );

  //ternary for the h5 tags t set a default value.

  const userStudyGroups = () => {
    return user.studyGroups.map((group) => (
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
    ));
  };

  const handleMajor = (e) => {
    setMajor(e.target.value);
  };

  const handleBio = (e) => {
    setBio(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(path, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `bio=${bio}&major=${major}`,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setStudy(data);
      });
  };

  return (
    <div>
      <div style={divStyle}>
        <Grid style={{ position: "relative", right: "20%" }}>
          <Paper elevation={10} style={paperStyle2}>
            <Grid align="center">
              <h4> User Study Groups</h4>
              {user.studyGroups >= 1
                ? userStudyGroups()
                : "you have no study groups"}
            </Grid>
          </Paper>
        </Grid>

        {Profile()}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <Button onClick={closeModal}>close</Button>
        <h5>Edit Profile</h5>
        <form>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              name="major"
              value="major"
              onChange={(e) => handleMajor(e)}
            />
            <TextField name="bio" value="bio" onChange={(e) => handleBio(e)} />

            <Button type="submit" onClick={(e) => handleSubmit(e)}>
              Submit
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Profile;
