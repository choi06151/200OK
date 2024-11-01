import { useLocation } from 'react-router-dom';
import Home from './Routes/Home';
import Dodge from './Routes/Dodge';
import Game from './Routes/Game';
import Ending from './Routes/Ending';
import styles from './App.module.css';

function App() {
  const location = useLocation();

  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <div className={styles.WhiteBar}></div>
      </header>

      <main>
        {location.pathname === '/' && <Home />}
        {location.pathname === '/dodge' && <Dodge />}
        {location.pathname === '/game' && <Game />}
        {location.pathname === '/end' && <Ending />}
      </main>
    </div>
  );
}

export default App;
