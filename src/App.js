import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './Routes/Home';
import Dodge from './Routes/Dodge';
import Game from './Routes/Game';
import Ending from './Routes/Ending';
import styles from './App.module.css';

function App() {
	const location = useLocation();

	return (
		<div className={styles.App}>
			<div className={styles.shadow}>
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="/dodge" element={<Dodge />}></Route>
					<Route path="/game" element={<Game />}></Route>
					<Route path="/end" element={<Ending />}></Route>
				</Routes>
			</div>
		</div>
	);
}

export default App;
