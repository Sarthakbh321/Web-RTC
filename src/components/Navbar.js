import React from "react";
import { makeStyles, useTheme, AppBar, Toolbar, Typography } from "@material-ui/core";
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
		marginLeft: "2%"
	}
}));

function Navbar() {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<AppBar position="static" className={classes.bar}>
				<Toolbar>
					<Link to="/">
						<img src="./CC LOGO-01.svg" className={classes.icon}/>
					</Link>
					<Typography variant="p" className={classes.navHead}>Codechef-VIT RTC</Typography>
				</Toolbar>
			</AppBar>
		</div>
	)
}

export default Navbar;