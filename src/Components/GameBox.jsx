import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CanvasBox from './CanvasBox';
import ChatBox from './ChatBox';
import Scoreboard from './Scoreboard';
import TopBar from './TopBar';

const GameContainer = styled.div`
	background-color: transparent;
	width: 90%;
	height: 80%;
	display: flex;
	align-items: center;
	padding: 1rem;
	flex-direction: column;
`;
const BotContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	padding: 1rem 0;
`;

const Gamebox = ({ socket, playerList, setPlayerList, name, setMode }) => {
	const [ isDrawer, setIsDrawer ] = useState(false);
	useEffect(() => {
		socket.on('newRound', () => {
			setIsDrawer(false);
		});
		socket.on('youAreDrawer', (word) => {
			setIsDrawer(true);
		});
	}, []);
	return (
		<GameContainer>
			<TopBar socket={socket} isDrawer={isDrawer} />
			<BotContainer>
				<Scoreboard socket={socket} playerList={playerList} setPlayerList={setPlayerList} />
				<CanvasBox socket={socket} isDrawer={isDrawer} setMode={setMode} />
				<ChatBox socket={socket} name={name} />
			</BotContainer>
		</GameContainer>
	);
};

export default Gamebox;
