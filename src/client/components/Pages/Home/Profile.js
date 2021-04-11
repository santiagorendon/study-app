import React, { useState } from "react";
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
} from "@material-ui/core";

const path = "/api/find-the-user";
function Profile() {
  const [user, setUser] = useState(null);
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
  };

  const paperStyle2 = {
    padding: 20,
    height: "50vh",
    width: "75%",
    margin: "20px auto",
  };

  const profileStyle = {
    position: "relative",
    left: "30%",
    maxWidth: "60%",
  };

  const gridStyle = {
    height: "100vh",
    width: "50em",
  };

  const gridStyle2 = {
    height: "25vh",
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  // useEffect =
  //   (() => {
  //     const id = localStorage.token;
  //     fetch(path, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded",
  //       },
  //       body: `id=${id}`,
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setUser(data);
  //       });
  //   },
  //   []);
  // fetch the user information here...

  const Profile = () => (
    <Grid style={gridStyle}>
      <Paper elevation={20} style={paperStyle2}>
        <Grid align="center">
          <h3>Profile</h3>
          <Grid align="center">
            <Avatar></Avatar>
          </Grid>
          <div>
            <h5>Username</h5>
            <h5>Email</h5>
            <h5>Age</h5>
            <h5>Major</h5>
            <h5>Bio</h5>
            <h5>Courses</h5>
          </div>
          <Button onClick={openModal}> Edit Profile </Button>
        </Grid>
      </Paper>
    </Grid>
  );

  const userStudyGroups = () => (
    <Card variant="outlined">
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          blach
        </Typography>
        <Typography variant="h5" component="h2">
          blach
        </Typography>
        <Typography color="textSecondary">blach</Typography>

        <CardActions>
          <CardActionArea>
            <Button size="small">
              <DeleteOutlineIcon></DeleteOutlineIcon>
            </Button>
          </CardActionArea>
        </CardActions>
      </CardContent>
    </Card>
  );

  return (
    <div>
      <div style={divStyle}>
        <div>
          <Grid style={gridStyle}>
            <Paper elevation={20} style={paperStyle2}>
              <Grid align="center">
                <h4> User Study Groups</h4>
                {userStudyGroups()}
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
        <Button onClick={closeModal}>close</Button>
        <h5>Edit Profile</h5>
        <form>
          <div>
            <input type="text" name="major" value="major" />
            <input type="text" name="major" value="major" />
            <textarea name="bio" value="major" />
            <textarea name="courses" value="courses" />
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Profile;
