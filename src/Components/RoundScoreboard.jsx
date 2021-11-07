import React, { useEffect } from 'react';
import styled from 'styled-components';

const RoundContainer = styled.div`
	background-color: grey;
	width: 100%;
	height: 80%;
	display: flex;
	flex-direction: column;
	/* justify-content: center; */
	/* align-items: center; */
`;
const PlayerCard = styled.div`
	border: 1px solid white;
	margin: 1rem 1rem;
	padding: 1rem;
	border-radius: 10px;
	display: flex;
	align-items: center;
	justify-content: space-between;
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
const RoundScoreboard = ({ roundScoreBoard }) => {
	const compareForSorting = (firstEl, secondEl) => {
		if (firstEl.score >= secondEl.score) {
			return -1;
		}
		if (firstEl.score < secondEl.score) {
			return 1;
		}
	};
	return (
		<RoundContainer>
			{roundScoreBoard.sort(compareForSorting).map(({ name, score }) => (
				<PlayerCard>
					<Name>{name}</Name>
					<Score>{score}</Score>
				</PlayerCard>
			))}
		</RoundContainer>
	);
};

export default RoundScoreboard;
