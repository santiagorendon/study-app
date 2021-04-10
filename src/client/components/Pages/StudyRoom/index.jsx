import React from 'react'
import { Grid, Typography, Container, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import TextField from '@material-ui/core/TextField';
import UserList from './UserList';

const useStyles = makeStyles({
    root: {
        
        background: '#E0E5EB',
    },
    wrap: {
        

        padding:'2rem',
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
function generate(element) {
    return [0, 1, 2].map((value) =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}

const StudyRoom = () => {
    const classes = useStyles();

    return (
        <Container className={classes.root}>
            <Grid container className={classes.wrap}>
                <Grid className='boxx' item sm={7} xs={12}>
                    <Typography variant="h2" component="h1">
                        Study Room Name
                    </Typography>
                </Grid>
                <Grid className='boxx' item xs sm={1}>
                    <Box m={1}>

                    Date
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
                        <Button variant="contained">Leave Room</Button>
                    </Box>
                    <Box m={1} mb={2}>
                        <Button variant="contained" color="primary"> Share room</Button>
                    </Box>
                </Grid>
                {/* row 2 */}
                <Grid
                    xs={12}
                    sm
                    container
                    direction="column"
                    justify="space-evenly"
                    alignItems="center"
                    className='boxx'
                    item
                >
                    <Box p={2}>


                        <Typography variant="body1" component="p">
                            Bio : Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the e release of Letraset sheets containing Lorem Ipsum passages, and more recently with de
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

                    <UserList />

                </Grid>

                <Grid sm={12} xs={12}>
                    <Card className={classes.chat}>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Word of the Day
                            </Typography>
                            <Typography color="textSecondary" gutterBottom>
                                Word of the Day
                            </Typography>
                            <Typography color="textSecondary" gutterBottom>
                                Word of the Day
                            </Typography>
                            <Typography color="textSecondary" gutterBottom>
                                Word of the Day
                            </Typography>

                        </CardContent>
                        <CardActions>
                            <form className={classes.form} noValidate autoComplete="off">
                                <TextField size="small" id="standard-basic" label="Standard" />

                                <Button size="small">Send</Button>
                            </form>

                        </CardActions>
                    </Card>

                </Grid>


            </Grid>


        </Container>

    )
}

export default StudyRoom

