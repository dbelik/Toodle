import React from 'react';

export default function MenuToggle({ onClick, className, activated }) {
    return (
        <button className={`w-8 h-6 relative ${className}`} onClick={onClick}>
            <span className="block top-0 absolute bg-primary h-1 w-full" style={activated ? {
                transform: "rotate(20deg) translate(16px, 0px)",
                width: "50%",
                transition: "var(--fast)"
            } : {}}></span>
            <span className="block top-2 absolute bg-primary h-1 w-full"></span>
            <span className="block top-4 absolute bg-primary h-1 w-full" style={activated ? {
                transform: "rotate(-20deg) translate(16px, 0px)",
                width: "50%",
                transition: "var(--fast)"
            } : {}}></span>
        </button>
    );
}