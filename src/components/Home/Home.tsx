import React, { useState } from 'react';
import { useSignInMutation, useSignUpMutation } from '../../services/taskApi';
import style from './Home.module.css';

const Home = () => {
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const [signUp] = useSignUpMutation();
  const [signIn] = useSignInMutation();

  const U = async () => {
    await signUp({
      name: name,
      login: login,
      password: password,
    });
  };

  const I = async () => {
    await signIn({
      login: login,
      password: password,
    });
  };

  return (
    <div className={style.home}>
      <div>HOME</div>
      <hr />
      <div className={style.signUp}>
        <div>Name</div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div>Login</div>
        <input
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <div>Password</div>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={U}>SIGN UP</button>
      </div>
      <hr />
      <div className={style.signIn}>
        <div>Login</div>
        <input
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <div>Password</div>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={I}>SIGN IN</button>
      </div>
      <hr />
    </div>
  );
};

export default Home;
