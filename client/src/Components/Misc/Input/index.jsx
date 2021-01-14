import React from 'react';

import { StyledInput } from "./Styles";

export default function Input({ placeholder, id, autoFocus }) {
    return (
        <StyledInput autoFocus={autoFocus} id={id} className="w-full outline-none rounded-3xl px-2 border-4 border-color-primary py-1" placeholder={placeholder} />
    );
}