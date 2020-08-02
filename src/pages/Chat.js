import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import AgoraRTC from "agora-rtc-sdk";

function Chat(props) {
	const [redirect, setRedirect] = useState(false);
	const [params, setParams] = useState({});

	let rtc = {
		client: null,
		joined: false,
		published: false,
		local: null,
		remote: [],
		params: {}
	}

	let options = {
		appId: "a3e7e983cf0848d08e0b6b97863c344b",
		channel: null,
		uid: null,
		token: null,
	}

	useEffect(() => {
		console.log(props.location.state);
		if(props.location.state === undefined) {
			setRedirect(true);
			return;
		}

		setParams(props.location.state);
		options.channel = props.location.state.room;
	}, [props.location.state]);

	useEffect(() => {
		rtc.client = AgoraRTC.createClient({codec: "h264", mode: "rtc"});

		rtc.client.init(options.appId, () => {
			console.log("init success");
		}, (error) => {
			console.log(error);
		})
	}, [])

	if(redirect) {
		return <Redirect to="/" />
	}
	return (
		<h1>HI</h1>
	)
}

export default Chat;