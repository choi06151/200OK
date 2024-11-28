import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Routes/Home';
import Dodge from './Routes/Dodge';
import Game from './Routes/Game';
import Story from './Routes/Story';
import Wait from './Routes/Wait';
import Ending from './Routes/Ending';
import styles from './App.module.css';
import DodgeTutorial from './Routes/DodgeTutorial';
import MainGameTutorial from './Routes/MainGameTutorial';
import EndingStory from './Routes/EndingStory';

function App() {
  return (
    <div className={styles.App}>
      <div className={styles.shadow}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dodge" element={<Dodge />} />
          <Route path="/game" element={<Game />} />
          <Route path="/wait" element={<Wait />} />
          <Route path="/endstory" element={<EndingStory />}></Route>
          <Route path="/end" element={<Ending />} />
          <Route path="/story" element={<Story />} />
          <Route path="/dodgetutorial" element={<DodgeTutorial />}></Route>
          <Route path="/maingametutorial" element={<MainGameTutorial />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
