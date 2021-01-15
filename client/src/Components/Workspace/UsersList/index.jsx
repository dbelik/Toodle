import React from 'react';

import User from "../User";

export default function UsersList({ room, showNames }) {
    return (
        <ul>
            { room?.users.map((user, index) => <li className="my-1" key={index}><User color={user.color} name={showNames ? user.name : ""} /></li>) }
        </ul>
    );
}