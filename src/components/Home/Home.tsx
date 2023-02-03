import React from 'react';
import { useSignInMutation, useSignUpMutation } from '../../services/taskApi';
import style from './Home.module.css';

const Home = () => {
  const [signUp] = useSignUpMutation();
    const [signIn] = useSignInMutation();

    const U = async () => {
      await signUp({
        name: '111',
        login: '111',
        password: '111',
      });
    };

    const I = async () => {
      const r = await signIn({
        login: '111',
        password: '111',
      });
      console.log(r);
    };

    return (
      <div className={style.home}>
        <div>HOME</div>
        <button onClick={U}>SIGN UP</button>
        <button onClick={I}>SIGN IN</button>
      </div>
    );
};

export default Home;
