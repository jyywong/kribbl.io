import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import CanvasControls from './CanvasControls';
import RoundScoreboard from './RoundScoreboard';
import Scoreboard from './Scoreboard';
import UnderscoresHint from './UnderscoresHint';

const CanvasContainer = styled.div`
	flex-grow: 1;
	height: 100%;
	background-color: transparent;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;
const StyledCanvas = styled.canvas`
	background-color: white;
	border-radius: 10px;
	width: 100%;
	flex-grow: 1;
`;
const TargetWord = styled.h2`
	margin: 0;
	font-size: 3rem;
	color: black;
`;
const Timer = styled.h2`
	font-size: 3rem;
	color: red;
	margin: 0;
`;
const GameEnd = styled.h1`
	font-size: 4rem;
	color: purple;
`;
const CanvasBox = ({ socket, isDrawer, setMode }) => {
	const canvasRef = useRef();

	const [ isPainting, setIsPainting ] = useState(false);
	const [ mousePosition, setMousePosition ] = useState({ x: 0, y: 0 });
	const [ roundStart, setRoundStart ] = useState(true);
	const [ gameEnd, setGameEnd ] = useState(false);
	const roundScoreBoard = useRef([]);

	const resetCanvas = () => {
		const canvas = canvasRef.current;
		const context = canvas.getContext('2d');
		if (context) {
			context.clearRect(0, 0, canvas.width, canvas.height);
		}
	};
	const getMousePos = (canvas, e) => {
		const rect = canvas.getBoundingClientRect();
		return {
			x: (e.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
			y: (e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
		};
	};
	const handleMouseDown = (e) => {
		const coordinates = getMousePos(canvasRef.current, e);
		if (coordinates && isDrawer) {
			setIsPainting(true);
			setMousePosition(coordinates);
		}
	};
	const handleMouseUp = () => {
		setIsPainting(false);
	};
	const handleMouseEnter = (e) => {
		if (e.buttons === 1 && isDrawer) {
			setIsPainting(true);
		}
	};
	const handleMove = (e) => {
		paint(e);
	};
	const drawLine = (oldMousePos, newMousePos, isServerDrawing) => {
		if (!canvasRef.current) {
			return;
		}
		if (!isServerDrawing) {
			socket.emit('drawing', { oldMousePos, newMousePos });
		}
		const canvas = canvasRef.current;
		const context = canvas.getContext('2d');
		if (context) {
			context.strokeStyle = 'red';
			context.lineJoin = 'round';
			context.lineWidth = 1;

			context.beginPath();
			context.moveTo(oldMousePos.x, oldMousePos.y);
			context.lineTo(newMousePos.x, newMousePos.y);
			context.closePath();

			context.stroke();
		}
	};
	const paint = (e) => {
		if (isPainting) {
			const newMousePosition = getMousePos(canvasRef.current, e);
			if (mousePosition && newMousePosition) {
				drawLine(mousePosition, newMousePosition, false);
				setMousePosition(newMousePosition);
			}
		}
	};
	useEffect(() => {
		socket.on('serverNewDrawing', (response) => {
			const { oldMousePos, newMousePos } = response;
			drawLine(oldMousePos, newMousePos, true);
		});
		socket.on('timerTick', (countdownTime) => {
			if (countdownTime <= 0) {
				setRoundStart(false);
			}
		});
		socket.on('newRoundScore', (response) => {
			roundScoreBoard.current = response;
		});
		socket.on('newRound', () => {
			// resetCanvas();
			setRoundStart(true);
		});
		socket.on('endOfGame', () => {
			console.log('end of game');
			setGameEnd(true);
			setTimeout(() => {
				setMode('lobby');
			}, 6000);
		});
	}, []);
	return (
		<CanvasContainer>
			{gameEnd && <GameEnd>Game Over</GameEnd>}
			{roundStart ? (
				<StyledCanvas
					ref={canvasRef}
					onMouseDown={handleMouseDown}
					onMouseUp={handleMouseUp}
					onMouseLeave={handleMouseUp}
					onMouseEnter={handleMouseEnter}
					onMouseMove={handleMove}
				/>
			) : (
				<RoundScoreboard socket={socket} roundScoreBoard={roundScoreBoard.current} />
			)}
			{isDrawer && <CanvasControls resetCanvas={resetCanvas} />}
		</CanvasContainer>
	);
};

export default CanvasBox;
