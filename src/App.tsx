import React from 'react';
import style from './App.module.css';
import CentralPanel from './components/CentralPanel/CentralPanel';
import Header from './components/Header/Header';
import LeftPanel from './components/LeftPanel/LeftPanel';
import RightPanel from './components/RightPanel/RightPanel';

const App = () => {
  return (
    <div className={style.App}>
      <div className={style.header}><Header /></div>
      <div className={style.leftPanel}><LeftPanel /></div>
      <div className={style.centralPanel}><CentralPanel /></div>
      <div className={style.rightPanel}><RightPanel /></div>
    </div>
  );
};

export default App;
