import React, { useState, useEffect } from 'react';
import PlayerCard from './PlayerCard';
import styled from 'styled-components';

const ScoreboardContainer = styled.div`
	background-color: transparent;
	border-radius: 10px;
	border: 2px solid white;
	padding: 1rem;
	display: flex;
	flex-direction: column;
	flex-basis: 20%;
	height: 75%;
	margin: 1rem;
`;

const Scoreboard = ({ socket, playerList, setPlayerList }) => {
	useEffect(() => {
		socket.on('updatePlayersList', (response) => {
			console.log('newplayer', response);
			setPlayerList(response);
		});
	}, []);
	return (
		<ScoreboardContainer>
			{playerList.map(({ name, score, hasGuessed, isDrawing }) => (
				<PlayerCard name={name} score={score} hasGuessed={hasGuessed} isDrawing={isDrawing} />
			))}
		</ScoreboardContainer>
	);
};

export default Scoreboard;
