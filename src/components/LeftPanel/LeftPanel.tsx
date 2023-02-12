import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './LeftPanel.module.css';
import { RxHome, RxCalendar, RxDashboard } from 'react-icons/rx';
import { isAuthorizedSelector } from '../../store/selectors';
import { useSelector } from 'react-redux';

const LeftPanel = () => {

  const authorized = useSelector(isAuthorizedSelector);

  return (
    <div className={style.LeftPanel}>
      <nav>
        <ul>
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? style.linkActive : style.link}>
              <RxHome />
              <span>Home</span>
            </NavLink>
          </li>
          {authorized && <li>
            <NavLink to="/boards" className={({ isActive }) => isActive ? style.linkActive : style.link}>
              <RxDashboard />
              <span>Boards</span>
            </NavLink>
          </li>}
          <li>
            <NavLink to="/calendar" className={({ isActive }) => isActive ? style.linkActive : style.link}>
              <RxCalendar />
              <span>Calendar</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default LeftPanel;
