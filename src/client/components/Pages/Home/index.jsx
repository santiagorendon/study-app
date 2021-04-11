import Axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import StudyRoomCard from './StudyRoomCard'
// import { NotificationContext } from '../../shared/Notifications';
import { NotificationContext } from '../../shared/Notifications'
import { Container } from '@material-ui/core'



const Home = () => {
    const getRooms = "/api/fetch-all"
    const { setNotification } = useContext(NotificationContext);
    const [rooms, setRooms] = useState([])

    useEffect(() => {
        Axios.get(getRooms)
            // .then(( studyGroups ) => console.log(studyGroups.data.studyGroups))
            .then(res => {
                console.log(res.data.studyGroups)
                if (res.status !== 200) {
                    setNotification({
                        type: "error",
                        message: "Not Found"
                    });
                } else if (res.status === 200) {
                    setRooms(res.data.studyGroups)
                    console.log('res')
                    console.log(res)

                } else {
                    setNotification({
                        type: "error",
                        message: "Something is wrong!"
                    });
                }
            })
    }, [])

    return (

        <div>
            {console.log(rooms)}
  
            <h1>  Group List</h1>



                {/* get from, the DB and populate the room card */}
            <Container>
                {rooms.map((room, i) => (
                   
                    <StudyRoomCard
                        key={i} 
                        groupName={room.name}
                        tags='Tags'
                        bio={room.bio}
                        meetDatetime={room._id}
                        id={room._id}
                        userAmount={room.userList.length} />

                ))}
            </Container>

            {/* <StudyRoomCard
                groupName=' Study group Example'
                tags='Tags'
                bio='Bio about the class and resources. embed the time of recurrent meeting'
                meetDatetime='21/21'
                userAmount='03' /> */}

              


        </div>
    )
}

export default Home