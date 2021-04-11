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
                {/* <form>

                    <InputGroup className="mt-3 mx-auto">
                        <FormControl
                            value={movieInput} onChange={e => setMovieInput(e.target.value)}
                            placeholder="Search Movie"
                            aria-label="Search Movie"

                        />
                        <InputGroup.Append>

                            <Button variant="primary" type="submit" onClick={handleClick}  ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg></Button>

                        </InputGroup.Append>
                    </InputGroup>

                </form> */}


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