import React from "react"
import Modal from "react-modal"

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
} from "@material-ui/core"

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
	},
}

const ProfileModal = ({modalIsOpen,closeModal, user}) => {
	return (
		<Modal
			isOpen={modalIsOpen}
			onRequestClose={closeModal}
			style={customStyles}
			contentLabel='Example Modal'>
			<h5>Edit Profile</h5>
			<form>
				<div style={{ display: "flex", flexDirection: "column" }}>
					<TextField
						label='major'
						placeholder={user.major}
						name='major'
						onChange={(e) => handleChange(e)}
						// label="Email"
						// placeholder="Enter Your Email"
						// name="email"
						// onChange={(e) => handleEmail(e)}
						fullWidth
						required
					/>
					<TextField
						label='bio'
						placeholder={user.bio}
						name='bio'
						onChange={(e) => handleChange(e)}
						fullWidth
						required
					/>
					{/* <TextField
      name="courses"
      value="courses"
      onChange={(e) => handleChange(e)}
    />  */}
					<div style={{ display: "flex", flexDirection: "column" }}>
						<Button
							type='submit'
							color='secondary'
							onClick={(e) => handleSubmit(e)}>
							Submit
						</Button>
						<Button onClick={closeModal} color='secondary'>
							close
						</Button>
					</div>
				</div>
			</form>
		</Modal>
	)
}

export default ProfileModal
