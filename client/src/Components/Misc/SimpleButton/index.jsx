import React from 'react';

import { StyledSimpleButton } from './Styles';

export default function SimpleButton({ children, onClick }) {
    return (
        <StyledSimpleButton onClick={onClick} className="bg-transparent p-0 color-primary"><b>{children}</b></StyledSimpleButton>
    )
}