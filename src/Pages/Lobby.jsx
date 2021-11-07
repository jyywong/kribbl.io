import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
const PageContainer = styled.div`
	background-color: #264653;

	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const StyledContainer = styled.div`
	width: 25%;
	height: 75%;

	display: flex;
	flex-direction: column;
	align-items: center;
	font-size: 4rem;
	color: white;
`;
const SettingsContainer = styled.div`
	width: 100%;
	padding: 1rem;
	color: white;
	border-radius: 10px;
	background-color: #1c323b;

	font-size: 1rem;
	display: flex;
	align-items: center;
	flex-direction: column;
`;
const SingleSettingContainer = styled.div`
	display: flex;
	justify-content: center;
	font-size: 1.5rem;
	margin: 1rem;
`;

const PlayerName = styled.p`
	font-size: 2rem;
	color: #e76f51;
`;
const PlayButton = styled.button`
	border: none;
	background-color: #2a9d8f;
	border-radius: 10px;
	padding: 1rem 2rem;
	font-size: 1.5rem;
	color: white;
	width: 90%;
	cursor: pointer;
`;
const Lobby = ({ socket, setMode, playerList, setPlayerList, name }) => {
	const handlePlay = () => {
		socket.emit('startGame');
	};
	useEffect(() => {
		socket.emit('newPlayerName', name);
		socket.emit('requestPlayersList');
		socket.on('updatePlayersList', (newPlayerList) => {
			console.log('beingaccessed');

			setPlayerList(newPlayerList);
		});
		socket.on('gameStarted', () => {
			setMode('play');
		});
	}, []);
	return (
		<PageContainer>
			<StyledContainer>
				Settings
				<SettingsContainer>
					<SingleSettingContainer>Number of Rounds</SingleSettingContainer>
					<SingleSettingContainer>Time to draw</SingleSettingContainer>
					<PlayButton onClick={handlePlay}>Play</PlayButton>
				</SettingsContainer>
			</StyledContainer>
			<StyledContainer>
				Players{playerList.map((player) => <PlayerName>{player.name}</PlayerName>)}
			</StyledContainer>
		</PageContainer>
	);
};

export default Lobby;
