import React from 'react';
import { useGetUsersQuery } from '../../services/userApi';
import style from './Home.module.css';

const Home = () => {

  const {data: getUsers} = useGetUsersQuery();

  return (
    <div className={style.home}>
      <div>HOME</div>
    </div>
  );
};

export default Home;
