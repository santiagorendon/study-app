import Axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import StudyRoomCard from "./StudyRoomCard";
// import { NotificationContext } from '../../shared/Notifications';
import { NotificationContext } from "../../shared/Notifications";
import { Container } from "@material-ui/core";
import NavBar from "./NavBar";

const Home = () => {
  const getRooms = "http://localhost:8080/rooms";
  const { setNotification } = useContext(NotificationContext);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    Axios.get(getRooms).then((res) => {
      if (res === none) {
        setNotification({
          type: "error",
          message: "Not Found",
        });
      } else if (res.status === 200) {
        setRooms(res.data);
      } else {
        setNotification({
          type: "error",
          message: "Something is wrong!",
        });
      }
    });
  }, []);

  return (
    <div>
      <NavBar />

      {/* get from, the DB and populate the room card */}
      {/* <Container>
                {rooms.map((room, i) => (
                    <StudyRoomCard
                        groupName=' Study group Name'
                        tags='Tags'
                        bio='Bio about the class and resources. embed the time of recurrent meeting'
                        meetDatetime='21/21'
                        userAmount='03' />

                ))}
            </Container> */}

      <StudyRoomCard
        groupName=" Study group Example"
        tags="Tags"
        bio="Bio about the class and resources. embed the time of recurrent meeting"
        meetDatetime="21/21"
        userAmount="03"
      />
    </div>
  );
};

export default Home;
