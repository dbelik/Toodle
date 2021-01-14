import React from 'react';

import { StyledPrimaryLink } from "./Styles.js";

export default function PrimaryLink({ children, href, onClick }) {
    return (
        <StyledPrimaryLink onClick={onClick} className="text-center btn-primary border-none outline-none block relative py-3 px-6 rounded-3xl bg-primary color-primary-content overflow-hidden" href={href}>
            <span className="relative z-10">{children}</span>
            <div className="w-full h-full absolute top-0 left-0 bg-primary-interact z-0"></div>
        </StyledPrimaryLink>
    )
}