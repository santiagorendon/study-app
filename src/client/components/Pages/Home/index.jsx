import Axios from "axios"
import React, { useState, useEffect, useContext } from "react"
import StudyRoomCard from "../StudyRoom/StudyRoomCard"
import { NotificationContext } from "../../shared/Notifications"

import { Container, Box, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"

const useStyles = makeStyles((theme) => ({

	input: {
		width: "30rem",
		marginBottom: "1rem",
	},
}))

const Home = () => {
	const classes = useStyles()

	const getRooms = "/api/fetch-all"
	const { setNotification } = useContext(NotificationContext)

	const [rooms, setRooms] = useState([])
    const [searchField, setSearchField] = useState("")
    const [filteredProducts, setFilteredProducts] = useState([])

	useEffect(() => {
		Axios.get(getRooms).then((res) => {
			if (res.status === 200) {
				setRooms(res.data.studyGroups)
                console.log(res.data.studyGroups)
			} else {
				setNotification({
					type: "error",
					message: `Something is wrong! error ${res.status}`,
				})
			}
		})
	}, [])
    	// update products based on search
	useEffect(() => {
		setFilteredProducts(rooms)
	}, [rooms])

    	// filter products list based on descriptions
	useEffect(() => {
		const filteredList = rooms.filter((item) => {

            const name = item.name.toLowerCase()

			if (name.indexOf(searchField.toLowerCase()) >= 0) {
                return true
			}
			return false
		})
		setFilteredProducts(filteredList)

	}, [searchField])

	return (
		<Container>
			<Grid container direction='column' justify='center' alignItems='center'>
				<Box m={5}>
					<h1> Group List</h1>
				</Box>
		
					<TextField
						onChange={(e) => setSearchField(e.target.value)}
						className={classes.input}
						id='outlined-basic'
						label='Search'
						variant='outlined'
					/>

				{filteredProducts.map((room, i) => (
					<StudyRoomCard
						key={i}
						groupName={room.name}
						tags='Tags'
						bio={room.bio}
						meetDatetime='22/22'
						id={room._id}
						userAmount={room.userList.length}
					/>
				))}
			</Grid>
		</Container>
	)
}

export default Home
