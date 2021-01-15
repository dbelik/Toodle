import styled from 'styled-components';

export const StyledPrimaryLink = styled.a`
    min-width: 150px;

    > div {
        transform: translateY(80%);
        transition: transform .1s;
    }

    :hover, :focus {
        color: white;
        
        > div {
            transform: translateY(0%);
        }
    }
`;