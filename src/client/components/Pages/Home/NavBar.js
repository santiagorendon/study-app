import React, { useState, useEffect, useContext} from "react";
import {
  Button,
  Drawer,
  List,
  Divider,
  ListItem,
  Card,
  Typography,
  TextField,
  InputLabel,
  Select,
  FormControl,
} from "@material-ui/core";
import { Redirect, Link } from "react-router-dom";
import Modal from "react-modal";
import {UserContext} from "./UserProvider"
import { useHistory } from "react-router-dom";


const path = "/api/logout";
const path2 = "/api/find-user";
const path3 = "/api/create-room";

function NavBar() {
  const [state, setState] = useState(false);

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  // useEffect(() => {
  //   const id = localStorage.token;
  //   fetch(path2, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded",
  //     },
  //     body: `id=${id}`,
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       setUser(data);
  //     });
  // }, []);
  // console.log(user);

  const navStyle = {
    backgroundColor: "pink",
    opacity: ".6",
    display: "flex",
    justifyContent: "space-around",
    paddingBottom: "1rem",
  };

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

  const buttonStyle = { position: "relative", top: "8.5px" };

  const toggleDrawer = (open) => (event) => {
    setState(open);
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    history.push("/");
    // fetch(path, {
    //   method: "GET",
    // }).then(response => console.log(response))
    //this is for closing the backend server?
  };

  const list = () => (
    <div onClick={toggleDrawer(false)}>
      <List>
        <ListItem>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            Home
          </Link>
        </ListItem>
        <ListItem>
          <Link
            to="/profile"
            style={{ textDecoration: "none", color: "black" }}
          >
            Profile
          </Link>
        </ListItem>
        <ListItem>
          <Link
            to="/studyroom"
            style={{ textDecoration: "none", color: "black" }}
          >
            Study Room
          </Link>
        </ListItem>
        <ListItem>
          <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
            Login
          </Link>
        </ListItem>
        <ListItem>
          <Link to="/signup" style={{ textDecoration: "none", color: "black" }}>
            signup
          </Link>
        </ListItem>

        {/* <ListItem>
          <Link to="/group" >
            create a group
          </Link>
        </ListItem> */}
        {!localStorage.token && <Redirect to="/login" />}
        <ListItem button onClick={handleLogout}>
          Logout
        </ListItem>
      </List>
    </div>
  );

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleBio = (e) => {
    setBio(e.target.value);
  };

  const handleClick = (e) => {
    console.log(user);

    e.preventDefault();

    const request = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `name=${name}&bio=${bio}&admin=${user}`,
    };

    fetch(path3, request)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => console.log(data));
  };

  const renderModal = () => (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div>
        <h2
          className="create-study"
          style={{ position: "relative", left: "130px" }}
        >
          Create A Study Group
        </h2>
      </div>

      <TextField label="name" name="name" onChange={(e) => handleName(e)} />
      <TextField label="Bio" name="bio" onChange={(e) => handleBio(e)} />
      {/* <FormControl>
        <InputLabel shrink htmlFor="select-multiple-native">
          Native
        </InputLabel>
        <Select
          multiple
          native
          inputProps={{
            id: "select-multiple-native",
          }}
        >
          Courses to select from?
        </Select>
      </FormControl> */}
      <Button type="submit" onClick={(e) => handleClick(e)}>
        Enter
      </Button>

      <Button onClick={closeModal}>close</Button>
    </Modal>
  );

  return (

    
    <div style={navStyle}>
      <Button onClick={openModal}> Create a Study Group </Button>
      <Button onClick={toggleDrawer(true)} style={buttonStyle}>
        Menu
      </Button>
      {renderModal()}
      <Drawer anchor={"left"} open={state} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
}

export default NavBar;
