import React from 'react';

import { StyledInput } from './Styles.js';

export default function Input({ placeholder }) {
    return (
        <StyledInput className="w-full outline-none rounded-2xl px-2 border-4 border-color-primary" placeholder={placeholder} />
    );
}