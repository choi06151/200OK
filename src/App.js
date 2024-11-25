import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Routes/Home';
import Dodge from './Routes/Dodge';
import Game from './Routes/Game';
import Story from './Routes/Story';
import Wait from './Routes/Wait';
import Ending from './Routes/Ending';
import styles from './App.module.css';

const imageList = [
  'jungleexample.jpg',
  'junglewoodback.avif',
  'jungle.jpg',
  'World.jpeg', // Add as many images as you want
];

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
          <Route path="/story" element={<Story />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
