import React from "react";
import { TextField, Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import './LoginForm.css';

function LoginForm(props) {
	
	return (
		<div className="form-container">
			<div className="form-div">
				<Typography variant="h4" className="form-head">Join Meeting</Typography>
				<TextField variant="outlined" label="Room" onChange={props.roomChange} value={props.room}></TextField>

				<Button
					className="join-btn"
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