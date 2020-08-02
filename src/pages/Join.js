import React, { useState } from "react";
import { Redirect } from "react-router-dom";

function Join() {
	const [room, setRoom] = useState("");
	const [started, setStarted] = useState(false);

	const handleRoomChange = (event) => {
		setRoom(event.target.value);
	}
	
	if(started) {
		return (
			<Redirect push to={{
				pathname: "/chat",
				state: {
					params: {
						room
					}
				}
			}} />
		)
	}

	return (
		<div className="App">
			<input placeholder="Room" onChange={handleRoomChange} value={room}></input>
			<button onClick={() => setStarted(true)}>Join</button>
		</div>
	)
}

export default Join;