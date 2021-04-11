import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Card, Box ,Grid} from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
    root: {
        width: '480px',
        // maxWidth: 550,
        background: '#E0E5EB',
        margin: '1rem',
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


const StudyRoomCard = ({ groupName, tags, bio, meetDatetime, userAmount, id }) => {

    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent >

                <Typography variant="h5" component="h2">
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                    >
                        <Grid item>

                        {groupName}
                        </Grid>
                        <Grid item>
                        {meetDatetime}
                        </Grid>
                    </Grid>
                    
                </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {tags}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {bio} 
                    </Typography>
            </CardContent>
                <CardActions className={classes.actions} >
                    <Box mr='auto'>Online Users {userAmount}</Box>
                    <Link to={`/studyroom/${id}`} >

                        <Button variant="contained" color="primary" size="small">Enter Room</Button>
                    </Link>
                </CardActions>
        </Card>
            )
}

            export default StudyRoomCard
