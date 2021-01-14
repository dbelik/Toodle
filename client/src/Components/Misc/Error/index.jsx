import React from 'react';

export default function Error({ children, className }) {
    return (
        <p className={`color-error ${className}`}>{children}</p>
    );
}