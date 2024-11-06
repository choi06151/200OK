import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Routes/Home';
import Dodge from './Routes/Dodge';
import Game from './Routes/Game';
import Wait from './Routes/Wait';
import Ending from './Routes/Ending';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.App}>
      <div className={styles.shadow}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dodge" element={<Dodge />} />
          <Route path="/game" element={<Game />} />
          <Route path="/wait" element={<Wait />} />
          <Route path="/end" element={<Ending />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
