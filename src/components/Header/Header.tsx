import React from 'react';
import { NavLink } from 'react-router-dom';
import style from  './Header.module.css';
import { RxMagnifyingGlass } from 'react-icons/rx';

const Header = () => {
  return (
    <div className={style.Header}>
      <nav>
        <ul className={style.navList}>
          <li className={style.navItem}>
            <NavLink to="/search" className={({ isActive }) => isActive ? style.linkActive : style.link}>
              <RxMagnifyingGlass />
              <span>Search</span>
            </NavLink>
          </li>
          <li className={style.navItem}>
            <NavLink to="/signin" className={({ isActive }) => isActive ? style.linkActive : style.link}>
              <span>Sign in</span>
            </NavLink>
          </li>
          <li className={style.navItem}>
            <NavLink to="/signup" className={({ isActive }) => isActive ? style.linkActive : style.link}>
              <span>Sign up</span>
            </NavLink>
          </li>
          <li className={style.navItem}>
            <NavLink to="/logout" className={({ isActive }) => isActive ? style.linkActive : style.link}>
              <span>Log out</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;