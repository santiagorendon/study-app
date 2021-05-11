import React, { useEffect, useState, useContext } from "react"

import { UserContext } from "../../shared/UserProvider"
import ProfileCard from "./ProfileCard"
import ProfileModal from "./ProfileModal"
import StudyGroupCard from "./StudyGroupCard"

import { Paper, Grid, Button, TextField } from "@material-ui/core"


function Profile() {
	const { user, setUser } = useContext(UserContext)
	const [major, setMajor] = useState("")
	const [bio, setBio] = useState("")
	const [study, setStudy] = useState([])
	const [modalIsOpen, setIsOpen] = useState(false)

	console.log("this is on the profile page", user)

	// useEffect(() => {
	//   const id = localStorage.token;
	//   fetch(path2, {
	//     method: "POST",
	//     headers: {
	//       "Content-Type": "application/x-www-form-urlencoded",
	//     },
	//     body: `id=${id}`,
	//   })
	//     .then((response) => response.json())
	//     .then((data) => {
	//       setUser(data);
	//     });
	// }, []);

	function openModal() {
		setIsOpen(true)
	}

	function closeModal() {
		setIsOpen(false)
	}
	// delete groups
	const handleDelete = (group) => {
		console.log(group)
		fetch(path, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		}).then(() => {
			return user.studyGroups.filter((studyGroup) => studyGroup !== group)
		})
	}

	//run this delete function by the group.
	let defaultAge = "set your age"
	let defaultMajor = "set your major"
	let defaultBio = "create your bio"
	let defaultCourses = "what courses are you currently studying?"

	const handleChange = (e) => {
		if (e.target.name === "major") {
			setMajor(e.target.value)
		}
		if (e.target.name === "bio") {
			setBio(e.target.value)
		}
	}
	const path = "/api/edit-user"

	const handleSubmit = (e) => {
		e.preventDefault()
		closeModal()
		const id = user.id
		fetch(path, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: `bio=${bio}&major=${major}&id=${id}`,
		})
			.then((response) => response.json())
			.then((data) => {
				setStudy(data)
			})
	}

	return (
		<>
			<Grid container>
				<Grid item sm={6}>
					<StudyGroupCard groups={user.studyGroups} handleDelete={handleDelete} />
				</Grid>

				<Grid item sm={6}>
					<ProfileCard openModal={openModal} user={user} />
				</Grid>
			</Grid>

			<ProfileModal
				modalIsOpen={modalIsOpen}
				closeModal={closeModal}
				user={user}
			/>
		</>
	)
}

export default Profile
