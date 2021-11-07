import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
	background-color: ${(props) => (props.isDrawing ? 'orange' : props.hasGuessed ? 'blue' : 'grey')};
	width: 100%;
	display: flex;
`;
const Name = styled.h4`
	margin: 0;
	font-size: 1.5rem;
	color: white;
`;
const Score = styled.p`
	margin: 0;
	margin-left: auto;
	font-size: 1.5rem;
	color: green;
`;
const PlayerCard = ({ name, score, hasGuessed, isDrawing }) => {
	return (
		<CardContainer hasGuessed={hasGuessed} isDrawing={isDrawing}>
			<Name>{name.substring(0, 5)}</Name>
			<Score>{score}</Score>
		</CardContainer>
	);
};

export default PlayerCard;
