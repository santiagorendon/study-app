import React from "react";
import { Paper, Grid, Avatar, Button } from "@material-ui/core";
import NavBar from "./NavBar";
import Modal from "react-modal";

function Profile() {
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
  const paperStyle = {
    borderWidth: "2px",
    borderColor: "green",
    width: "20%",
    height: "50%",
    position: "relative",
    top: "50%",
    left: "15%",
    backgroundColor: "white",
    //   border: 2px solid green ;
    // width: 20%;
    // height: 50%;
    // position: fixed;
    // top: 50%;
    // left: 15%;
    // transform: translate(-50%, -50%);
    // background-color: white;
    // font-family: 'Quicksand', sans-serif;
    // font-size: 16px
  };
  const paperStyle2 = {
    padding: 20,
    height: "65%",
    maxWidth: "25%",
    marginRight: "52%",
    marginTop: "2%",
  };
  const gridStyle = {
    height: "100vh",
  };
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const Profile = () => (
    <Grid style={gridStyle}>
      <Paper elevation={20} style={paperStyle}>
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
      </Paper>
    </Grid>
  );

  const userStudyGroups = () => (
    <Grid style={gridStyle}>
      <Paper elevation={20}>
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
      </Paper>
    </Grid>
  );
  return (
    <div>
      <NavBar />
      {Profile()}
      {userStudyGroups()}
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
