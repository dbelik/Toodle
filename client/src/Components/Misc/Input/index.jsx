import React from 'react';

export default function Input({ placeholder, id }) {
    return (
        <input id={id} className="w-full outline-none rounded-2xl px-2 border-4 border-color-primary" placeholder={placeholder} />
    );
}