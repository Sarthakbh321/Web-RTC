import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import AgoraRTC from "agora-rtc-sdk";
import './Chat.css';
import { IconButton } from "@material-ui/core";
import {Close} from "@material-ui/icons";

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
        appId: process.env.REACT_APP_APP_ID,
        channel: null,
        uid: null,
        token: null,
    }

    useEffect(() => {
        if (props.location.state === undefined) {
            setRedirect(true);
            return;
        }

        setParams(props.location.state);
        options.channel = props.location.state.params.room;
    }, [props.location.state]);

    useEffect(() => {
        rtc.client = AgoraRTC.createClient({ codec: "h264", mode: "rtc" });

        rtc.client.on("stream-added", (event) => {
            let remoteStream = event.stream;
            let id = remoteStream.getId();

            if (id !== rtc.params.uid) {
                rtc.client.subscribe(remoteStream, (error) => {
                    console.log("stream subscribe failed", error);
                });
            }

            console.log("stream subscribe successful, uid:" + id);
        });

        rtc.client.on("stream-subscribed", (event) => {
            let remoteStream = event.stream;
            let id = remoteStream.getId();

            remoteStream.play("other");
            console.log("stream subscribed: " + id);
        });

        rtc.client.on("stream-removed", (event) => {
            let remoteSteam = event.stream;
            let id = remoteSteam.getId();

            remoteSteam.stop("other");

            console.log("stream removed: " + id);
        })

        rtc.client.init(options.appId, () => {
            console.log("init success");

            rtc.client.join(null, options.channel, null, (uid) => {
                console.log(`joined channel ${options.channel} with uid: ${uid}`);
                rtc.params.uid = uid;
                rtc.local = AgoraRTC.createStream({ streamID: uid, audio: true, video: true, screen: false });

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
            if(rtc.client && rtc.local) {
                rtc.client.unpublish(rtc.local);
                rtc.client.leave(() => {
                    rtc.local.stop();
                    rtc.local.close();
    
                    console.log("client leave successful");
                }, (error) => {
                    console.log("client leave failed");
                })
            }
        }
    }, [])

    if (redirect) {
        return <Redirect to="/" />
    }
    return ( 
        <div className="chat-section">
            <IconButton href="/" className="close-btn"><Close size={32}/></IconButton>
            <div id="player"> </div> 
            {/* <div id="other"> </div>  */}
        </div>
    )
}

export default Chat;