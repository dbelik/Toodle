import React from 'react';

import { StyledPrimaryBtn } from "./Styles.js";

export default function PrimaryLink({ children, onClick }) {
    return (
        <StyledPrimaryBtn onClick={onClick} className="btn-primary block relative py-3 px-6 rounded-3xl bg-primary color-primary-content overflow-hidden">
            <span className="relative z-10">{children}</span>
            <div className="w-full h-full absolute top-0 left-0 bg-primary-interact z-0"></div>
        </StyledPrimaryBtn>
    )
}