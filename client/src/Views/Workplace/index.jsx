import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import Editor from "../../Components/Workspace/Editor";
import Menu from "../../Components/Workspace/Menu";
import UsersList from "../../Components/Workspace/UsersList";

import Broadcast from "./Broadcast";
import ContentFormat from "./ContentFormat";
import Room from './Room';
import User from './User';

function receiveContent(data, connection, room, broadcast, setContent, setRoom) {
    if (data.type !== "content") return;

    const content = data.data;

    switch (content.type) {
        case "text": { setContent(content.content); break; }
        case "user joins": {
            room.join(content.content);
            setRoom(new Room(room.users));
            break; 
        }
        case "user leaves": {
            room.leave(room.find(content.content));
            setRoom(new Room(room.users));
            break; 
        }
        case "room": {
            content.content.users.forEach((user) => room.join(user));
            setRoom(new Room(room.users));
            return;
        }
        default: console.log(content); return;
    }

    broadcast.broadcast(data, [connection]);
}

// Bind additional events on top of existing to actually work with content.
function bindBroadcastEvents(broadcast, room, alias, contentFormat, setUrlId, setUser) {
    broadcast.peer.on("open", () => {
        const user = new User(broadcast.peer.id, alias);
        // Add first user (this user) to the room.
        room.join(user);

        setUser(user);
        setUrlId(broadcast.peer.id);
        
        const urlId = getPeerId();
        if (urlId) {
            const connection = broadcast.connect(urlId);

            // Send to the connected user information (name & color) about this user.
            connection.on("open", () => {
                const content = broadcast.format.content(contentFormat.userJoins(user));
                broadcast.send(connection, content);
            });
    
            connection.on("close", () => {
                console.log(room);
            });
        }

        broadcast.peer.on("connection", (connection) => {
            // When connection is open, send local users table (room).
            connection.on("open", () => connection.send(broadcast.format.content(contentFormat.room(room))));

            // When user leaves the room, tell other users that the user has left.
            connection.on("close", () => {
                room.leave(room.find(connection.peer)[0])
                broadcast.broadcast(contentFormat.userLeaves(connection.peer));
            });
        });
    });
}

function getPeerId(workplace) {
    const search = window.location.search;
    return !search ? null : search.substring(1);
}

export default function Workplace() {
    const [urlId, setUrlId] = useState("");
    const [content, setContent] = useState("");
    const [broadcast, setBroadcast] = useState(null);
    const [contentFormat, setContentFormat] = useState(null);
    const [user, setUser] = useState(null);
    let [room, setRoom] = useState(null);

    useEffect(() => {
        // If user hasn't created profile yet.
        const alias = localStorage.getItem("alias");
        if (!alias) {
            window.location.href = "/profile";
            return;
        }

        room = new Room();
        setRoom(room);

        const broadcast = new Broadcast((data, connection) => receiveContent(data, connection, room, broadcast, setContent, setRoom));
        const contentFormat = new ContentFormat();
        setContentFormat(contentFormat);
        bindBroadcastEvents(broadcast, room, alias, contentFormat, setUrlId, setUser);

        setBroadcast(broadcast);
    }, []);

    return (
        <HelmetProvider>
            <Helmet>
                <title>Toodle | Workplace</title>
            </Helmet>

            <Menu urlId={urlId} />
            <UsersList room={room} />

            <Editor onChange={(content) => {
                setContent(content);
                broadcast.broadcast(broadcast.format.content(contentFormat.text(content)));
            }} value={content} />
        </HelmetProvider>
    );
}