import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = (props) => {
  return <header className={s.header}>
    <NavLink to="/">
      <img src="https://icon-library.com/images/it-icon-png/it-icon-png-7.jpg" alt=""/>
    </NavLink>
    <div className={s.loginBlock}>
      { props.isAuth
          ? <>{props.login} - <button onClick={props.logout}>log out</button></>
          : <NavLink to={'/login'}>Login</NavLink>
      }
    </div>
  </header>
}

export default Header;
