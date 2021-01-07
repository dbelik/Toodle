import React from 'react';
import anime from 'animejs';

import { StyledPrimaryBtn } from "./Styles.js";

function ClickHandler(e) {
    e.preventDefault();
    
    let target = e.target;
    let element = target;
    if (target.tagName === "SPAN") target = target.parentNode;
    else if (target.tagName !== "DIV") element = target.children[1]

    anime({
        target: element,
        translateY: 10
    });
}

export default function PrimaryLink({ children, href }) {
    return (
        <StyledPrimaryBtn onClick={ClickHandler} className="btn-primary border-none outline-none block relative py-3 px-6 rounded-3xl bg-primary color-primary-content overflow-hidden" href={href}>
            <span className="relative z-10">{children}</span>
            <div className="w-full h-full absolute top-0 left-0 bg-primary-interact z-0"></div>
        </StyledPrimaryBtn>
    )
}