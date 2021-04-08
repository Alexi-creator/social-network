import React from 'react';
import s from './Navbar.module.css';
import photo from '../../assets/images/user.png';

const FriendsItem = (props) => {
    return (
        <div className={s.friendsBlock}>
            <img src={photo} alt=""/>
            <div className={s.name}>{props.state}</div>
        </div>
    )
}

export default FriendsItem;
