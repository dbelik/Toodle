import React from 'react';

import { StyledMenuToggle } from "./Styles";

export default function MenuToggle({ onClick, className }) {
    return (
        <button className={`w-full ${className}`} onClick={onClick}>
            <span className="block bg-primary h-1 mb-1 w-full"></span>
            <span className="block bg-primary h-1 mb-1 w-full"></span>
            <span className="block bg-primary h-1 w-full"></span>
        </button>
    );
}