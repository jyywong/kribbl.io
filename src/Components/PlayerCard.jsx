import React from 'react';
import { BsPencilFill } from 'react-icons/bs';
import styled from 'styled-components';

const CardContainer = styled.div`
	box-sizing: border-box;
	margin-bottom: 1rem;
	padding: 1rem;
	border-radius: 10px;
	background-color: ${(props) => (props.hasGuessed ? '#60b660' : 'rgb(255, 255, 255, 0.8)')};

	width: 100%;
	display: flex;
	align-items: center;
`;
const StyledPencil = styled(BsPencilFill)`
	margin-left: .5rem;
	font-size: 1.25rem;
`;
const Name = styled.h4`
	margin: 0;
	font-size: 1.5rem;
	color: #264653;
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
			{isDrawing && <StyledPencil />}
			<Score>{score}</Score>
		</CardContainer>
	);
};

export default PlayerCard;
