import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import style from './Header.module.css';
import { RxMagnifyingGlass } from 'react-icons/rx';
import { resetUser } from '../../store/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { isAuthorizedSelector } from '../../store/selectors';
import LogOut from '../LogOut/LogOut';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authorized = useSelector(isAuthorizedSelector);

  useEffect(() => {
    if (!authorized) {
      navigate('/');
    }
  }, [authorized, navigate]);

  return (
    <div className={style.Header}>
      <nav>
        <ul className={style.navList}>
          <li className={style.navItem}>
            <NavLink
              to="/search"
              className={({ isActive }) =>
                isActive ? style.linkActive : style.link
              }
            >
              <RxMagnifyingGlass />
              <span>Search</span>
            </NavLink>
          </li>
          {!authorized && (<li className={style.navItem}>
            <NavLink
              to="/signin"
              className={({ isActive }) =>
                isActive ? style.linkActive : style.link
              }
            >
              <span>Sign in</span>
            </NavLink>
          </li>)}
          {!authorized && (<li className={style.navItem}>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                isActive ? style.linkActive : style.link
              }
            >
              <span>Sign up</span>
            </NavLink>
          </li>)}
          {authorized && (
            <li className={style.navItem}>
              <div className={style.link}>
                <div onClick={() => dispatch(resetUser())}>
                  <LogOut />
                </div>
              </div>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
