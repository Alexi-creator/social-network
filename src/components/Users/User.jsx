import React from 'react';
import styles from './User.module.css'
import userPhoto from './../../assets/images/user.png';
import {NavLink} from "react-router-dom";

const User = ({user, followingInProgress, unfollow, follow}) => {

    return (
        <div className={styles.wrap}>
            <div className={styles.imgBlock}>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                        <img className={styles.userImg} src={user.photos.small != null ? user.photos.small : userPhoto}
                             alt=""/>
                    </NavLink>
                </div>
                <div>
                    {user.followed
                        ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                            unfollow(user.id)
                        }}>Unfollow</button>
                        : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                            follow(user.id)
                        }}>Follow</button>
                    }
                </div>
            </div>
            <div>
                <span>
                    <div className={'so'}>{user.name}</div>
                    <div>{user.status}</div>
                </span>
                <span>
                    <div>{'user.location.country'}</div>
                    <div>{'user.location.city'}</div>
                </span>
            </div>
        </div>
    )
}

export default User;
