import React from 'react';
import styled from 'styled-components';
const WordHint = styled.h2`
	font-size: 3rem;
	margin: 0;
	margin-bottom: 1rem;
	color: black;
`;
const UnderscoresHint = ({ wordHintLength }) => {
	const getUnderscores = () => {
		let hintString = '';
		for (let i = 0; i < wordHintLength; i++) {
			if (i !== 0) {
				hintString += ' ';
			}
			hintString += '_';
		}
		return hintString;
	};
	const hintString = getUnderscores();

	return <WordHint>{hintString}</WordHint>;
};

export default UnderscoresHint;
