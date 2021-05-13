import React, { useState, useEffect, useContext } from "react";
import logo from "./logo.png";
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
import { UserContext } from "../UserProvider";
import { NotificationContext } from "../Notifications";
import { useHistory } from "react-router-dom";

const path = "/api/logout";
const path2 = "/api/find-user";
const path3 = "/api/create-room";

function NavBar() {
  const [state, setState] = useState(false);

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [playlistUrl, setPlaylist] = useState("");
  const { user, setUser } = useContext(UserContext);
  const { notification, setNotification } = useContext(NotificationContext);
  const history = useHistory();
  console.log(user);

  // const navBar = {
  //   overFlow: "hidden",
  //   backgroundColor: "#333",
  //   position: fixed /* Set the navbar to fixed position */,
  //   paddingTop: 0 /* Position the navbar at the top of the page */,
  //   width: "100%",
  // };

  const navStyle = {
    backgroundColor: "#EA5843",
    fontFamily: "Permanent Marker",
    fontSize: "20px",
    opacity: ".6",
    display: "flex",
    justifyContent: "space-between",
  };

  const divStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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

  console.log("this is the token", token);
  const token = localStorage.token;
  const list = () => (
    <div>
      {token ? (
        <div
          style={{ display: "flex", flexDirection: "row", paddingTop: "13px" }}
        >
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

          {!localStorage.token && <Redirect to="/login" />}
          <ListItem button onClick={handleLogout}>
            Logout
          </ListItem>
        </div>
      ) : (
        <div
          style={{ display: "flex", flexDirection: "row", paddingTop: "13px" }}
        >
          <ListItem>
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              Home
            </Link>
          </ListItem>

          <ListItem>
            <Link
              to="/signup"
              style={{ textDecoration: "none", color: "black" }}
            >
              Signup
            </Link>
          </ListItem>
          <ListItem>
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "black" }}
            >
              Login
            </Link>
          </ListItem>
        </div>
      )}
    </div>
  );

  const handleChange = (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    }
    if (e.target.name === "bio") {
      setBio(e.target.value);
    }
    if (e.target.name === "playlist") {
      setPlaylist(e.target.value);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    const request = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `name=${"Biology"}&bio=${"lets learn together"}&admin=${"soccerfan1"}`,
    };

    fetch(path3, request)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => console.log(data));

    //     if (user) {
    //       const request = {
    //         method: "POST",
    //         headers: { "Content-Type": "application/x-www-form-urlencoded" },
    //         body: `name=${name}&bio=${bio}&admin=${user.id}&playlistUrl=${playlistUrl}`,
    //       };
    //       fetch(path3, request)
    //         .then((response) => response.json())
    //         .then((data) => console.log(data));
    //     } else {
    //       console.log(notification);
    //     }
  };
  const handleNotification = () => {
    setNotification({
      type: "info",
      message: "Please make an account or sign in to create a study room",
    });
  };

  const renderModal = () => (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div style={divStyle}>
        {/* admin: admin,
      name: name,
      userList: userList,
      playlistUrl: playlistUrl,
      bio: bio,
      messageList: [],
      **resource is not in the fetch?
      */}

        <h2 className="create-study">Create A Study Group</h2>
        <form style={divStyle}>
          {/* <div> Admin: {user.}</div> */}
          <TextField
            label="Name"
            name="name"
            onChange={(e) => handleChange(e)}
          />
          <TextField label="Bio" name="bio" onChange={(e) => handleChange(e)} />
          <TextField
            label="Playlist"
            name="playlist"
            style={{ overflow: "scroll", whiteSpace: "nowrap" }}
            placeholder="Paste your playlist"
            onChange={(e) => handleChange(e)}
          />
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button type="submit" onClick={(e) => handleClick(e)}>
              Enter
            </Button>

            <Button onClick={closeModal}>close</Button>
          </div>
        </form>
      </div>

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
    </Modal>
  );

  return (
    <div style={navStyle}>
      {!user ? (
        <ListItem onClick={() => handleNotification()}>
          {" "}
          Create a Study Group{" "}
        </ListItem>
      ) : (
        <ListItem onClick={openModal}> Create a Study Group </ListItem>
      )}
      <div style={{ maxWidth: "6%", padding: "2px", marginRight: "30%" }}>
        <Link to="/">
          <img src={logo} style={{ maxWidth: "72%" }} />
        </Link>
      </div>
      {renderModal()}
      {list()}
    </div>
  );
}

export default NavBar;
