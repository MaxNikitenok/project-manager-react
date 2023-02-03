import React from 'react';
import style from './CentralPanel.module.css';
import { Route, Routes } from 'react-router-dom';
import Boards from '../Boards/Boards';
import Calendar from '../Calendar/Calendar';
import Home from '../Home/Home';

const CentralPanel = () => {
  
  const NoMatch = () => {
    return (
      <div className={style.noMatch}>
        <div>NO MATCH</div>
      </div>
    );
  };

  return (
    <div className={style.CentralPanel}>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/boards" element={<Boards />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
};

export default CentralPanel;
