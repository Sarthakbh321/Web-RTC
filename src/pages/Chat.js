import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import AgoraRTC from "agora-rtc-sdk";
import './Chat.css';
import { concatSeries } from "async";

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
		if(props.location.state === undefined) {
			setRedirect(true);
			return;
		}

		setParams(props.location.state);
		options.channel = props.location.state.params.room;
	}, [props.location.state]);

	useEffect(() => {
		rtc.client = AgoraRTC.createClient({codec: "h264", mode: "rtc"});

		rtc.client.init(options.appId, () => {
			console.log("init success");

			rtc.client.join(null, options.channel, null, (uid) => {
				console.log(`joined channel ${options.channel} with uid: ${uid}`);
				rtc.local = AgoraRTC.createStream({streamID: uid, audio: true, video: true, screen: false});

				rtc.local.init(() => {
					console.log("local stream initialized");
					rtc.local.play("player");

					rtc.client.publish(rtc.local, (error) => {
						console.log("localstream publish failed ", error)
					})
				}, (error) => {
					console.log("local stream init failed: ", error);
				})
			}, (error) => {
				console.log("channel join failed: ", error);
			})

		}, (error) => {
			console.log("client init failed ", error);
		})


		return () => {
			rtc.client.leave(() => {
				rtc.local.stop();
				rtc.local.close();
				
				console.log("client leave successful");
			}, (error) => {
				console.log("client leave failed");
			})
		}
	}, [])

	if(redirect) {
		return <Redirect to="/" />
	}
	return (
		<>
			<h1>HI</h1>
			<div id="player"></div>
		</>
	)
}

export default Chat;