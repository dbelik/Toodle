import React from 'react';

export default function User({ color, name }) {
    return (
        <div className="flex items-center">
            <div style={{ backgroundColor: color }} className="w-9 h-9 rounded-full mr-2"></div>
            <span>{name}</span>
        </div>
    );
}