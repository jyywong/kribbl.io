import React from 'react';
import styled from 'styled-components';

const Name = styled.span`
	font-weight: bold;
	color: black;
`;
const StyledMessage = styled.p`
	font-size: 1.2rem;
	margin: .5rem 0;
	width: 90%;
	height: fit-content;
`;
const Message = ({ username, text }) => {
	return (
		<StyledMessage>
			<Name>{username}: </Name>
			{text}
		</StyledMessage>
	);
};

export default Message;
