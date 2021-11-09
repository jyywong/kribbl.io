import React from 'react';
import styled from 'styled-components';

const AnnouncementContainer = styled.p`
	margin: .5rem 0;
	color: #60b660;
	font-size: 1.2rem;
	font-weight: bold;
	width: 90%;
	hyphens: auto;
	height: fit-content;
`;
const Announcement = ({ message }) => {
	return <AnnouncementContainer>{message}</AnnouncementContainer>;
};

export default Announcement;
