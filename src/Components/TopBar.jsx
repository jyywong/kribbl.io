import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import UnderscoresHint from './UnderscoresHint';

const TopContainer = styled.div`
	box-sizing: border-box;
	padding: 1rem;
	width: 100%;
	background-color: rgb(255, 255, 255, 0.8);
	border-radius: 10px;
	display: flex;
`;
const CountDown = styled.h2`
	margin: 0;
	font-size: 2rem;
	color: #264653;
`;
const Hint = styled.div`
	margin: 0;
	flex-grow: 1;
	font-size: 2rem;
	color: #264653;
	text-align: center;
`;
const TopBar = ({ socket, isDrawer }) => {
	const [ timer, setTimer ] = useState(10);
	const [ wordHintLength, setWordHintLength ] = useState(0);
	const [ word, setWord ] = useState('');

	useEffect(() => {
		socket.on('timerTick', (countdownTime) => {
			setTimer(countdownTime);
			if (countdownTime <= 0) {
				// setRoundStart(false);
			}
		});
		socket.on('youAreDrawer', (word) => {
			setWord(word);
		});
		socket.on('wordHint', (response) => {
			setWordHintLength(response);
		});
		socket.on('newRound', () => {
			setTimer(60);
			setWordHintLength(0);
			setWord('');
		});
	}, []);
	return (
		<TopContainer>
			<CountDown>Time left: {timer}</CountDown>
			<Hint>{isDrawer ? <Hint>{word}</Hint> : <UnderscoresHint wordHintLength={wordHintLength} />}</Hint>
		</TopContainer>
	);
};

export default TopBar;
