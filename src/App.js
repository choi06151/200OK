import styles from './App.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Route, Router, Routes } from 'react-router-dom';

import Home from './Routes/Home';
import Contract from './Routes/Contract';
import Dodge from './Routes/Dodge';
import Game from './Routes/Game';
import Ending from './Routes/Ending';

function App() {
	return (
		<div className={styles.App}>
			<Routes>
				<Route path="/" element={<Home></Home>}></Route>
				<Route path="/contract" element={<Contract></Contract>}></Route>
				<Route path="/dodge" element={<Dodge></Dodge>}></Route>
				<Route path="/game" element={<Game></Game>}></Route>
				<Route path="/end" element={<Ending></Ending>}></Route>
			</Routes>
		</div>
	);
}

export default App;
