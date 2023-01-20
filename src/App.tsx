import React from 'react';
import style from './App.module.css';
import LeftPanel from './components/LeftPanel';

const App = () => {
  return (
    <div className={style.App}>
      <LeftPanel />
      <p>App in development</p>
    </div>
  );
};

export default App;
