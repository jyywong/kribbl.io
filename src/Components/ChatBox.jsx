import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Announcement from './Announcement';
import Message from './Message';

const ChatContainer = styled.div`
	background-color: rgb(255, 255, 255, 0.8);
	margin-left: 1rem;
	border-radius: 10px;
	width: 22%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;
const ChatLog = styled.div`
	background-color: transparent;
	border-radius: 10px;
	flex-grow: 1;
	padding: 1rem;
	overflow: auto;
`;
const ChatInputContainer = styled.form`
	background-color: transparent;
	border-radius: 10px;
	display: flex;
	margin: .5rem;
`;
const ChatTextInput = styled.input`
	width: 100%;
	border: none;
	padding: .5rem;
	background-color: rgb(38, 70, 83, 0.5);
	border-radius: 5px;

	&::placeholder {
		color: rgb(255, 255, 255, 0.6);
	}
`;

const Chatbox = ({ socket, name }) => {
	const [ messageList, setMessageList ] = useState([]);
	const [ messageInput, setMessageInput ] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		setMessageList([ ...messageList, { isAnnounce: false, username: name, message: messageInput } ]);
		setMessageInput('');
		socket.emit('newMessage', { message: messageInput });
	};
	const handleNewMessage = ({ username, message }) => {
		console.log(username);
		setMessageList((current) => [ ...current, { username, message } ]);
	};
	useEffect(() => {
		socket.on('serverNewMessage', handleNewMessage);
		socket.on('someoneGuessedRight', (socketID) => {
			const announcement = `${socketID} guessed the word!`;
			setMessageList((current) => [ ...current, { isAnnounce: true, message: announcement } ]);
		});
	}, []);
	return (
		<ChatContainer>
			<ChatLog>
				{messageList.map(({ isAnnounce, username, message }, index) => {
					return isAnnounce ? (
						<Announcement message={message} />
					) : (
						<Message key={index} username={username} text={message} />
					);
				})}
			</ChatLog>
			<ChatInputContainer onSubmit={handleSubmit}>
				<ChatTextInput
					type="text"
					placeholder="Type your guess here"
					value={messageInput}
					onChange={(e) => {
						setMessageInput(e.target.value);
					}}
				/>
			</ChatInputContainer>
		</ChatContainer>
	);
};

export default Chatbox;
