import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Routes/Home';
import Dodge from './Routes/Dodge';
import Game from './Routes/Game';
import Wait from './Routes/Wait';
import Ending from './Routes/Ending';
import styles from './App.module.css';

function App() {
  // water, food, timeLeft 상태 관리
  const [water, setWater] = useState(5);
  const [food, setFood] = useState(5);
  const [timeLeft, setTimeLeft] = useState(30);

  return (
    <div className={styles.App}>
      <div className={styles.shadow}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dodge"
            element={
              <Dodge
                water={water}
                food={food}
                timeLeft={timeLeft}
                setWater={setWater}
                setFood={setFood}
                setTimeLeft={setTimeLeft}
              />
            }
          />
          <Route
            path="/game"
            element={
              <Game
                water={water}
                food={food}
              />
            }
          />
          <Route path="/wait" element={<Wait />} />
          <Route path="/end" element={<Ending />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
