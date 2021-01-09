import styled from 'styled-components';

export const StyledSimpleButton = styled.button`
    transition: color var(--fast);
    :hover, :focus {
        color: var(--primary-interact);
    }
`;