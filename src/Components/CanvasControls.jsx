import React from 'react';
import styled from 'styled-components';

const ControlsContainer = styled.div`width: 100%;`;

const StyledButton = styled.button``;
const CanvasControls = ({ resetCanvas }) => {
	const handleReset = () => {
		resetCanvas();
	};
	return (
		<ControlsContainer>
			<StyledButton onClick={handleReset}>Reset</StyledButton>
		</ControlsContainer>
	);
};

export default CanvasControls;
