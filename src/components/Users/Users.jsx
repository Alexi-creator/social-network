import React from 'react';
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

const Users = ({currentPage, totalUsersCount, pageSize, onPageChanged, users, minPage, setPaginator, porcionPaginator, ...props}) => {

    return (
        <div>

            <Paginator  currentPage={currentPage}
                        onPageChanged={onPageChanged}
                        totalUsersCount={totalUsersCount}
                        pageSize={pageSize}
                        minPage={minPage}
                        setPaginator={setPaginator}
                        porcionPaginator={porcionPaginator}
            />

            <div>
                {
                    users.map(u => <User user={u}
                                         followingInProgress={props.followingInProgress}
                                         unfollow={props.unfollow}
                                         follow={props.follow}
                                         key={u.id} />)
                }
            </div>
        </div>
    )
}

export default Users;
