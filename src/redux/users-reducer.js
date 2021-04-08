import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/object-helpers";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';
const SET_MIN_PAGINATOR = 'SET_MIN_PAGINATOR';


let initialState = {
    users: [
        /*{id: 1, photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/41/AlexiLaiho.jpg', followed: false, fullName: 'Dmitry', status: 'I am a boss', location: {city: 'Minsk', country: 'Belarus'}},
        {id: 2, photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/41/AlexiLaiho.jpg', followed: true, fullName: 'Dmitry', status: 'I am a boss too', location: {city: 'Moscow', country: 'Russia'}},
        {id: 3, photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/41/AlexiLaiho.jpg', followed: false, fullName: 'Dmitry', status: 'I am a boss too', location: {city: 'Kiev', country: 'Ukraina'}}*/
    ],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
    minPage: 1, // левая граница страницы в порции
    porcionPaginator: 10 // размер порции для пагинатора
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }
        case SET_USERS: {
            return {
                ...state,
                users: [...action.users] // перезатираем наш массив state с users, делаея копию массива users из пришедшего объекта action
            }
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state,
                totalUsersCount: action.count
            }
        }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id!= action.userId)
            }
        }
        case SET_MIN_PAGINATOR: {
            return {
                ...state,
                minPage: action.minPage
            }
        }
        default:
            return state;
    }
}

export const followSuccess = (userId) => ({type: FOLLOW, userId});
export const unfollowSuccess = (userId) => ({type: UNFOLLOW, userId});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const toggleFollowingProcess = (isFetching, userId) => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId});
export const setCurrentPaginator = (minPage) => ({type: SET_MIN_PAGINATOR, minPage});



// Paginator
export const setPaginator = (minPage) => {
    return (dispatch) => {
        dispatch(setCurrentPaginator(minPage))
    }
}

// thunk creator функция
export const requestUsers = (currentPage, pageSize) => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));

        let data = await usersAPI.getUsers(currentPage, pageSize);
        dispatch(setUsers(data.items))
        dispatch(setTotalUsersCount(data.totalCount))
        dispatch(setCurrentPage(currentPage))
        dispatch(toggleIsFetching(false))
    }
}

// общая ф-ия которая объединяет снизу 2 ф-ии
// но в каждой ф-ии будем вызывать общую но с передачей своих параметров
const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleFollowingProcess(true, userId))
    let response = await apiMethod(userId)
    if (response.data.resultCode == 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProcess(false, userId))
}

// thunk creator функция
export const follow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess)
    }
}

// thunk creator функция
export const unfollow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess)
    }
}



export default usersReducer;
