import React, { useState, useEffect } from 'react';

import { Link } from "react-router-dom";

import { Grid, Typography, Container, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import TextField from '@material-ui/core/TextField';
import UserList from './UserList';
import Messaging from "./Messaging";

const useStyles = makeStyles({
    root: {

        background: '#E0E5EB',
    },
    wrap: {


        padding: '2rem',
    },
    videoContainer: {
        // overflow: 'hidden',
        // position: 'relative',
        // maxWidth: '500px',
    },

    chat: {
        background: '#888',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.14), 0px 3px 4px rgba(0, 0, 0, 0.12), 0px 1px 5px rgba(0, 0, 0, 0.2)',
    },
    form: {
        background: '#999',
        // width:'100%',

    },

});


const StudyRoom = () => {
    const classes = useStyles();
    const { id } = useParams();
    const [studyRoom, setStudyRoom] = useState({})


 useEffect(() => {
        fetch(`/api/fetch-one-room`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `id=${id}`
        })
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                console.log(res)
                console.log(res.group)
                setStudyRoom(res.group)

            })
            .catch(err => {
                console.log(err)
            })
    }, [id])


    return (
        <Container className={classes.root}>
            <Grid container className={classes.wrap}>
                <Grid className='boxx' item sm={7} xs={12}>
                    <Typography variant="h2" component="h1">

                        {studyRoom.name}

                    </Typography>
                </Grid>
                <Grid className='boxx' item xs sm={1}>
                    <Box m={1}>

                        Date:
                    </Box>
                </Grid>
                <Grid
                    sm={4}
                    xs={6}
                    className='boxx'
                    container
                    direction="column"
                    justify="space-evenly"
                    alignItems="center"
                    item >
                    <Box m={1}>
                        <Link to="/" >
                        <Button variant="contained" >Leave Room</Button>
                        </Link>
                    </Box>
                    <Box m={1} mb={2}>
                        <Button variant="contained" color="primary"> Share room</Button>
                    </Box>
                </Grid>
                {/* row 2 */}
                <Grid
                    item
                    xs={12}
                    sm
                    container
                    direction="column"
                    justify="space-evenly"
                    alignItems="center"
                    className='boxx'
                >
                    <Box p={2}>


                        <Typography variant="body1" component="p">
                            {studyRoom.bio}
                        </Typography>
                    </Box>

                    <Box className={classes.videoContainer} ><iframe width="100%" height="300" src="https://www.youtube.com/embed/reRYtjr1BNo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe> </Box>

                </Grid>
                {/* user list */}
                <Grid
                    xs={12}
                    sm={4}
                    className='boxx'
                    container
                    direction="column"
                    justify="start"
                    alignItems="center"
                    item
                >
                    <UserList
                        // users={studyRoom.userList}
                    />

                </Grid>

                <Grid sm={12} xs={12}>
                    <Messaging />
                </Grid>


            </Grid>


        </Container>

    )
}

export default StudyRoom
