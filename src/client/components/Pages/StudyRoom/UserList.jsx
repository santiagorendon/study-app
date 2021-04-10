import React from 'react'

import { Grid, Typography , Container, Box} from '@material-ui/core'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    root: {
        paddingTop: '1rem',
        // background: '#E0E5EB',
    },


});

const UserList = () => {
    const classes = useStyles();

    function generate(element) {
        return [0, 1, 2].map((value) =>
          React.cloneElement(element, {
            key: value,
          }),
        );
      }
    return (
        <Container className={classes.root}>
            <Typography  align='center' gutterBottom variant="h5" >
                User List
            </Typography>
            <div >
                <List dense='dense'>
                    {generate(
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>

                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary="User Name"
                            // secondary= 'Secondary text'
                            />
                        </ListItem>,
                    )}
                </List>
            </div>

        </Container>
    )
}

export default UserList
