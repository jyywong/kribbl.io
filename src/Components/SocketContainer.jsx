import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import GameBox from './GameBox';
import Lobby from '../Pages/Lobby';
import io from 'socket.io-client';

const MainContainer = styled.div`
	height: 100vh;
	width: 100vw;
	background-color: #264653;
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const SocketContainer = ({ mode, setMode, name }) => {
	const [ playerList, setPlayerList ] = useState([]);
	const [ socket, setSocket ] = useState(null);

	useEffect(
		() => {
			const connectedSocket = io.connect('localhost:3001');
			setSocket(connectedSocket);
		},
		[ setSocket ]
	);

	return (
		<React.Fragment>
			{socket ? mode === 'lobby' ? (
				<Lobby
					socket={socket}
					setMode={setMode}
					playerList={playerList}
					setPlayerList={setPlayerList}
					name={name}
				/>
			) : (
				<MainContainer>
					<GameBox
						socket={socket}
						playerList={playerList}
						setPlayerList={setPlayerList}
						name={name}
						setMode={setMode}
					/>
				</MainContainer>
			) : (
				'loading'
			)}
		</React.Fragment>
	);
};

export default SocketContainer;
