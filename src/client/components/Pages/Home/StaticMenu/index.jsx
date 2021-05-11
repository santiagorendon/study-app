import React from "react";
import {
  Button,
  Drawer,
  List,
  Divider,
  ListItem,
  Paper,
  Grid,
  Box,
  TextField,
} from "@material-ui/core";
import { Redirect, Link } from "react-router-dom";
import Modal from "react-modal";
// import { UserProvider } from ".../.../shared/UserProvider/index";
// import { NotificationContext } from "../Notifications";

function StaticMenu() {
  // const { notification, setNotification } = useContext(NotificationContext);

  // const handleNotification = () => {
  //   setNotification({
  //     type: "info",
  //     message: "Please make an account or sign in to create a study room",
  //   });
  // };
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
    flexDirection: "column",
    alignItems: "center",
  };

  const buttonStyle = { position: "relative", top: "8.5px" };
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

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
    </Modal>
  );

  return (
    <div>
      <Grid>
        <Paper>
          <Link>My Study Groups</Link>
        </Paper>
      </Grid>

      {/* {renderModal()} */}
    </div>
  );
}

export default StaticMenu;
