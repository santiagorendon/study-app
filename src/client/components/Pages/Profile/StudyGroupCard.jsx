import React from "react";
import {
  Paper,
  Avatar,
  Grid,
  Typography,
  Card,
  Button,
  CardContent,
  CardActions,
  CardActionArea,
  TextField,
} from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

const paperCardStyle = {
  padding: "2rem",
  // height: "50vh",
  //   width: "280%",
  //   margin: "20px auto",
  //   overflow: "scroll",
};

const fontStyle = {
  fontFamily: "'Roboto', sans-serif",
  fontSize: "20px",
};

const StudyGroupCard = ({ groups }) => {
  return (
    <Grid style={paperCardStyle} align="center">
      <Paper elevation={5}>
        <Card variant="outlined" style={fontStyle}>
          <h4> User Study Groups</h4>
          <CardContent>
            {groups
              ? groups.map((group) => (
                  <>
                    <Typography color="textSecondary" gutterBottom>
                      {group}
                    </Typography>
                    <Typography variant="h5" component="h2">
                      {group.bio}
                    </Typography>
                  </>
                ))
              : "you have no study groups"}

            <CardActions>
              <CardActionArea>
                {/* <Button size='small' onClick={() => handleDelete(group)}>
									<DeleteOutlineIcon></DeleteOutlineIcon>
								</Button> */}
              </CardActionArea>
            </CardActions>
          </CardContent>
        </Card>
      </Paper>
    </Grid>
  );
};

export default StudyGroupCard;
