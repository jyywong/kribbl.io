import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Message from './Message';

const ChatContainer = styled.div`
	background-color: transparent;
	margin: 1rem;
	border: 2px solid white;
	border-radius: 10px;
	width: 20%;
	height: 75%;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;
const ChatLog = styled.div`
	background-color: transparent;
	border-radius: 10px;
	flex-grow: 1;
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
	background-color: #1d3844;
	border-radius: 5px;

	&::placeholder {
		color: #8f8f8f;
	}
`;
const ChatTextSend = styled.button`
	border: 1px solid black;
	border-radius: 5px;
`;
const Chatbox = ({ socket }) => {
	const [ messageList, setMessageList ] = useState([]);
	const [ messageInput, setMessageInput ] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		setMessageList([ ...messageList, messageInput ]);
		setMessageInput('');
		socket.emit('newMessage', { message: messageInput });
	};
	const handleNewMessage = ({ message }) => {
		setMessageList((current) => [ ...current, message ]);
	};
	useEffect(() => {
		socket.on('serverNewMessage', handleNewMessage);
		socket.on('someoneGuessedRight', (socketID) => {
			const announcement = `${socketID} guessed the word!`;
			setMessageList((current) => [ ...current, announcement ]);
		});
	}, []);
	return (
		<ChatContainer>
			<ChatLog>
				{messageList.map((message, index) => {
					return <Message key={index} text={message} />;
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
				{/* <ChatTextSend type="submit">Send</ChatTextSend> */}
			</ChatInputContainer>
		</ChatContainer>
	);
};

export default Chatbox;
