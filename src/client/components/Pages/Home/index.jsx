import Axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import StudyRoomCard from './StudyRoomCard'
// import { NotificationContext } from '../../shared/Notifications';
import { NotificationContext } from '../../shared/Notifications'

import { Container, Box, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
    root: {
        // background: '#222',
    },
    input: {
        width:'30rem',
        marginBottom:'1rem',

    }

}));

const Home = () => {
    const getRooms = "/api/fetch-all"
    const { setNotification } = useContext(NotificationContext);
    const [rooms, setRooms] = useState([])
    const classes = useStyles();
    useEffect(() => {
        Axios.get(getRooms)
            // .then(( studyGroups ) => console.log(studyGroups.data.studyGroups))
            .then(res => {
useEffect(() => {
        Axios.get(getRooms)
            // .then(( studyGroups ) => console.log(studyGroups.data.studyGroups))
            .then(res => {
                if (res.status !== 200) {
                    setNotification({
                        type: "error",
                        message: "Not Found"
                    });
                } else if (res.status === 200) {
                    setRooms(res.data.studyGroups)

                } else {
                    setNotification({
                        type: "error",
                        message: "Something is wrong!"
                    });
                }
            })
    }, [])
    return (

        <Container>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
            >

                <Box m={5} >
                    <h1>  Group List</h1>
                </Box>
                <form className={classes.root} noValidate autoComplete="off">
            
                    <TextField className={classes.input}  id="outlined-basic" label="Search" variant="outlined" />
                </form>

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



            </Grid>
        </Container>
    )
}

export default Home