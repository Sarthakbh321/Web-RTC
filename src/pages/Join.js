import React, { useState } from "react";
import { Link } from "react-router-dom";

function Join() {
	const [room, setRoom] = useState("");

	const handleRoomChange = (event) => {
		setRoom(event.target.value);
	}
	
	return (
		<div className="App">
			<input placeholder="Room" onChange={handleRoomChange} value={room}></input>
			<Link to={{
				pathname: '/chat',
				state: {
					params: {
						room
					}
				}
			}}>
				<button>Join</button>
			</Link>
		</div>
	)
}

export default Join;