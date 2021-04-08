import React from 'react';
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";
import Friends from "./Friends";
import {connect} from "react-redux";


let mapStateToProps = (state) => {
    return {
        state: state.sidebar.friends
    }
}

export const MyFriendsContainer = connect(mapStateToProps)(Friends);



const Navbar = (props) => {
  return (
      <div className={s.nav}>
          <nav>
              <div className={s.item}>
                  <NavLink to="/profile" activeClassName={s.active}>Profile</NavLink>
              </div>
              <div className={s.item}>
                  <NavLink to="/dialogs" activeClassName={s.active}>Messages</NavLink>
              </div>
              <div className={s.item}>
                  <NavLink to="/news" activeClassName={s.active}>News</NavLink>
              </div>
              <div className={s.item}>
                  <NavLink to="/music" activeClassName={s.active}>Music</NavLink>
              </div>
              <div className={s.item}>
                  <NavLink to="/users" activeClassName={s.active}>Users</NavLink>
              </div>
              <div className={s.item + ' ' + s.settings}>
                  <NavLink to="/settings" activeClassName={s.active}>Settings</NavLink>
              </div>
          </nav>

          <MyFriendsContainer/>

      </div>

  );
}

export default Navbar;
