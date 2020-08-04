import React, { useState } from "react";
import {Container} from "@material-ui/core";
import LoginForm from "../components/LoginForm";

function Join() {
	const [room, setRoom] = useState("");

	const handleRoomChange = (event) => {
		setRoom(event.target.value);
	}
	
	return (
		<Container className="App">
			<LoginForm roomChange={handleRoomChange} room={room}/>
		</Container>
	)
}

export default Join;