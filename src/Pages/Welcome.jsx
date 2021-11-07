import React from 'react';
import styled from 'styled-components';
const PageContainer = styled.div`
	height: 100vh;
	width: 100vw;
	margin: 0;
	padding: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #264653;
	color: #e9c46a;
	flex-direction: column;
`;
const Title = styled.h1`
	color: #e9c46a;
	font-size: 4rem;
`;

const MenuContainer = styled.div`
	box-sizing: border-box;
	padding: 1rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 30%;
	height: 40%;
	background-color: transparent;
	border-radius: 10px;
`;
const NameInput = styled.input`
	box-sizing: border-box;
	border-radius: 10px;
	padding: 1rem;
	width: 90%;
	font-size: 1rem;
	margin-bottom: 1rem;
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
const Welcome = ({ setMode, name, setName }) => {
	const handleChange = (e) => {
		setName(e.target.value);
	};
	const handlePlay = () => {
		if (name.length !== 0) {
			setMode('lobby');
		}
	};
	return (
		<PageContainer>
			<Title>Kribbl.io</Title>
			<MenuContainer>
				<NameInput placeholder="Enter your name" type="text" value={name} onChange={handleChange} />
				<PlayButton onClick={handlePlay}>PLAY</PlayButton>
			</MenuContainer>
		</PageContainer>
	);
};

export default Welcome;
