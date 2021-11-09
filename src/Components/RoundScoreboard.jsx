import React, { useEffect } from 'react';
import styled from 'styled-components';

const RoundContainer = styled.div`
	box-sizing: border-box;
	padding: 1rem;
	background-color: rgb(255, 255, 255, 0.8);
	border-radius: 10px;
	width: 100%;
	height: 80%;
	display: flex;
	flex-direction: column;
	align-items: center;
	/* justify-content: center; */
	/* align-items: center; */
`;

const ScoreTitle = styled.h1`
	font-size: 2rem;
	color: #264653;
`;
const PlayerCard = styled.div`
	box-sizing: border-box;
	/* border: 1px solid white; */

	padding: 1rem;
	border-radius: 10px;
	width: 35%;
	display: flex;
	align-items: center;
	justify-content: space-between;
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
	color: #54e454;
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
			<ScoreTitle>Time's up!</ScoreTitle>
			{roundScoreBoard.sort(compareForSorting).map(({ name, score }, index) => (
				<PlayerCard key={index}>
					<Name>{name}</Name>
					<Score>{score}</Score>
				</PlayerCard>
			))}
		</RoundContainer>
	);
};

export default RoundScoreboard;
