import styled from 'styled-components';

export const StyledPrimaryBtn = styled.button`
    > div {
        transform: translateY(80%);
        transition: transform .1s;
    }

    :hover, :focus {
        > div {
            transform: translateY(0%);
        }
    }
`;