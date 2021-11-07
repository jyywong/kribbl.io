import { useState } from 'react';

import Welcome from './Pages/Welcome';
import SocketContainer from './Components/SocketContainer';

function App() {
	const [ mode, setMode ] = useState('welcome');
	const [ name, setName ] = useState('');

	return mode === 'welcome' ? (
		<Welcome mode={mode} setMode={setMode} name={name} setName={setName} />
	) : (
		<SocketContainer mode={mode} setMode={setMode} name={name} />
	);
}

export default App;
