import React from "react"
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

  const ProfileCard = ({openModal, user}) => {
    const paperStyle2 = {
      padding: "20%",
      height: "50vh",
      width: "280%",
      margin: "20px auto",
      overflow: "scroll",
    
    };
	return (
		<Grid item xs>
			<Paper elevation={20} style={paperStyle2}>
				<Grid align='center'>
					<h3>Profile</h3>
					<Grid>
						<Avatar></Avatar>
					</Grid>
					<div>
						<h5> Username: {user.username}</h5>
						<h5> Email: {user.email}</h5>
					</div>

					<Button onClick={openModal} color='secondary'>
						{" "}
						Edit Profile{" "}
					</Button>
				</Grid>
			</Paper>
		</Grid>
	)
}

export default ProfileCard
