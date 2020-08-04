import React from "react";
import { TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import './LoginForm.css';

function LoginForm(props) {
	
	return (
		<div className="form-container">
			<div className="form-div">
				<TextField variant="outlined" placeholder="Room" onChange={props.roomChange} value={props.room}></TextField>

				<Button
					variant="contained"
					component={Link}
					to={{
						pathname: '/chat',
						state: {
							params: {
								room: props.room
							}
						}
					}}
				>
					Join
				</Button>
			</div>
		</div>
	)
}

export default LoginForm;