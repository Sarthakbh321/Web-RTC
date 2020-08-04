import React from "react";
import { makeStyles, AppBar, Toolbar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";



const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	bar: {
		backgroundColor: "white",
		display: 'flex',
		color: "black"
	},
	icon: {
		width: 130,
		height: 50
	},
	navHead: {
		marginLeft: "2%",
		fontWeight: "bold"
	}
}));

function Navbar() {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<AppBar position="static" className={classes.bar} elevation={4}>
				<Toolbar>
					<Link to="/">
						<img src="./CC LOGO-01.svg" className={classes.icon} alt="logo"/>
					</Link>
					<Typography variant="p" className={classes.navHead}>Codechef-VIT RTC</Typography>
				</Toolbar>
			</AppBar>
		</div>
	)
}

export default Navbar;