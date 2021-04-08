import React from 'react';
import {connect} from 'react-redux';
import {
    setCurrentPage, toggleFollowingProcess,
    requestUsers, follow,
    unfollow, setPaginator
} from '../../redux/users-reducer';
import Users from './Users';
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount, getUsers
} from "../../redux/users-selectors";



class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize);
    }



    render() {
        return <>
            { this.props.isFetching ? <Preloader/> : null }
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   unfollow={this.props.unfollow}
                   follow={this.props.follow}
                   followingInProgress={this.props.followingInProgress}
                   minPage={this.props.minPage}
                   porcionPaginator={this.props.porcionPaginator}
                   setPaginator={this.props.setPaginator}
            />
        </>
    }
}

/*let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}*/

// в файле users-selectors они описаны
let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        minPage: state.usersPage.minPage,
        porcionPaginator: state.usersPage.porcionPaginator
    }
}




// let withRedirect = withAuthRedirect(UsersContainer)

/*
в аргумент connect раньше передавали ф-ю возвращающаю объект:
let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
            dispatch(followAC(userId))
        },
        unfollow: (userId) => {
            dispatch(unfollowAC(userId))
        },
        setUsers: (users) => {
            dispatch(setUsersAC(users))
        },
        setCurrentPage: (pageNumber) => {
            dispatch(setCurrentPageAC(pageNumber))
        },
        setTotalUsersCount: (totalCount) => {
            dispatch(setUsersTotalCountAC(totalCount))
        },
        toggleIsFetching: (isFetching) => {
            dispatch(toggleIsFetchingAC(isFetching))
        },
    }
}*/

//export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);

// а можно просто в аргумент кинуть сразу объект
/*export default connect(mapStateToProps, {
    follow: follow,
    unfollow: unfollow,
    setUsers: setUsers,
    setCurrentPage: setCurrentPage,
    setTotalUsersCount: setUsersTotalCount,
    toggleIsFetching: toggleIsFetching,
})(UsersContainer);*/



// еще короче, ключ берется из импортнутых ф-ий он же будет значением
// так можно в js дестуктуризация это как ф-и в объекте их можно
// просто писать без ключа

export default compose(
    connect(mapStateToProps, {
        follow, unfollow, setCurrentPage,
        toggleFollowingProcess, getUsers: requestUsers, setPaginator })
)(UsersContainer)

