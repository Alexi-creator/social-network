import React from 'react';
import s from './Navbar.module.css';
import FriendsItem from "./FriendsItem";


const Friends = (props) => {

    let friendsElement = props.state
        .map((elem, index) => <FriendsItem key={index} state={elem.name}/>)

    return (
        <div className={s.friends}>
            <h3>Friends</h3>
            <div className={s.friendsWrap}>
                {friendsElement}
            </div>
        </div>
    )
}

export default Friends;
