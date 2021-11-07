import React from 'react';
import styled from 'styled-components';
import CanvasBox from './CanvasBox';
import ChatBox from './ChatBox';
import Scoreboard from './Scoreboard';

const GameContainer = styled.div`
	background-color: transparent;
	width: 90%;
	height: 90%;
	display: flex;
	align-items: center;
	padding: 1rem;
`;

const Gamebox = ({ socket, playerList, setPlayerList }) => {
	return (
		<GameContainer>
			<Scoreboard socket={socket} playerList={playerList} setPlayerList={setPlayerList} />
			<CanvasBox socket={socket} />
			<ChatBox socket={socket} />
		</GameContainer>
	);
};

export default Gamebox;
