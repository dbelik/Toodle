import React from 'react';

export default function User({ color, name }) {
    return (
        <div className="flex justify-center items-center">
            <div style={{ backgroundColor: color }} className={`w-9 h-9 rounded-full ${name || name === "" ? "" : "mr-2"}`}></div>
            <span>{name}</span>
        </div>
    );
}