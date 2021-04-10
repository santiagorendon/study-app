import React from 'react'
import { Grid, Typography , Container, Box} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

import TextField from '@material-ui/core/TextField';
import UserList from './UserList';

const useStyles = makeStyles({
    root: {

        background: '#E0E5EB',
    },
    userList: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    chat: {
        background: '#888',
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
            <Grid container>
                <Grid className='box' item sm={7}>
                    <Typography variant="h2" component="h1">
                        Study Room Name
                    </Typography>
                </Grid>
                <Grid className='box' item sm={1}>
                    Date
                </Grid>
                <Grid className='box'
                    container
                    direction="column"
                    justify="space-evenly"
                    alignItems="center"
                    item sm={4}>
                    <Button variant="contained">Default</Button>
                    <Button variant="contained" color="primary"> Button</Button>
                </Grid>
                <Grid container
                    direction="column"
                    justify="space-evenly"
                    alignItems="center" className='box' item sm={8}>
                    <Box p={3}>
                        <Typography variant="body1" component="h5">
                            Bio : Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the e release of Letraset sheets containing Lorem Ipsum passages, and more recently with de
                        </Typography>
                    </Box>
                    <Box><iframe width="560" height="315" src="https://www.youtube.com/embed/reRYtjr1BNo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> </Box>

                </Grid>
                {/* user list */}
                <Grid className='box'
                    container
                    direction="column"
                    justify="start"
                    alignItems="center"
                    item 
                    sm={4}>

                        <UserList/>
               

      
                </Grid>

                <Grid sm={12}>
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

            <aside>

            </aside>

        </Container>

    )
}

export default StudyRoom
