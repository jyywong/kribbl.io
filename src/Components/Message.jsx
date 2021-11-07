import React from 'react';
import styled from 'styled-components';

const StyledMessage = styled.p`font-size: 1.5rem;`;
const Message = ({ text }) => {
	return <StyledMessage>{text}</StyledMessage>;
};

export default Message;
