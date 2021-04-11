import React from 'react'

import { Grid, Typography, Container, Box } from '@material-ui/core'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    root: {
        paddingTop: '1rem',
        background: '#C4C4C4',
        minHeight: '26rem',
        borderRadius: '5px',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.14), 0px 3px 4px rgba(0, 0, 0, 0.12), 0px 1px 5px rgba(0, 0, 0, 0.2)',

    },


});

const UserList = ({ users }) => {
    const classes = useStyles();
    console.log(users)

    return (
        <Container className={classes.root}>
            <Typography align='center' gutterBottom variant="h5" >
                User List
            </Typography>
            <div >
                <List dense='dense'>
                    {[0, 2, 3, 4].map((user, i) => 
                        <ListItem key={i}>
                            <ListItemAvatar>
                                <Avatar>

                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText >
                               User {user}

                            </ListItemText>


                        </ListItem>
                 
               )}

                </List>
            </div>

        </Container>
    )
}

export default UserList
