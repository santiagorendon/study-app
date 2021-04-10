import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Card, Box } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
    root: {
        minWidth: 275,
        maxWidth: 500,
        background: '#E0E5EB',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    actions: {
        padding: '1rem',
    },
});


const StudyRoomCard = ({ groupName, tags, bio, meetDatetime, userAmount }) => {

    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent >

                <Typography variant="h5" component="h2">
                    {groupName}
                    <Box ml={2} component='span'>({meetDatetime})</Box>
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {tags}
                </Typography>
                <Typography variant="body2" component="p">
                    {bio} {meetDatetime}
                </Typography>
            </CardContent>
            <CardActions className={classes.actions} >
                <Box mr='auto'>users Online {userAmount}</Box>
                <Button variant="contained" color="primary" size="small">Enter Room</Button>
            </CardActions>
        </Card>
    )
}

export default StudyRoomCard
