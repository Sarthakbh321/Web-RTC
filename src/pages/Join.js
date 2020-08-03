import React, { useState } from "react";
import { Link } from "react-router-dom";
import {Container, Button, TextField} from "@material-ui/core";

function Join() {
	const [room, setRoom] = useState("");

	const handleRoomChange = (event) => {
		setRoom(event.target.value);
	}
	
	return (
		<Container className="App">
			<TextField variant="outlined" placeholder="Room" onChange={handleRoomChange} value={room}></TextField>
			<Button 
				variant="contained"
				component={Link}
				to={{
					pathname: '/chat',
					state: {
						params: {
							room
						}
					}
				}}
			>
				Join
			</Button>
		</Container>
	)
}

export default Join;