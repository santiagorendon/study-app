import React from "react";
import { List, Button, ListItem } from "@material-ui/core";
import { Redirect, Link } from "react-router-dom";
import Modal from "react-modal";
import { UserContext } from ".../UserProvider";
import { NotificationContext } from "../Notifications";

function StaticMenu() {
  const { user, setUser } = useContext(UserContext);
  const { notification, setNotification } = useContext(NotificationContext);

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
    <div>
      {!user ? (
        <Button onClick={() => handleNotification()} style={buttonStyle}>
          {" "}
          Create a Study Group{" "}
        </Button>
      ) : (
        <Button onClick={openModal} style={buttonStyle}>
          {" "}
          Create a Study Group{" "}
        </Button>
      )}
      <List>
        <ListItem>
          <Link>My Study Groups</Link>
        </ListItem>
        <ListItem></ListItem>
      </List>
      {renderModal()}
    </div>
  );
}

export default StaticMenu;
