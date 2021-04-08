import {myAPI, userAPI} from "../api/api";
import {stopSubmit} from "redux-form";


const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SEVE_PHOTO_SUCCESS = 'SEVE_PHOTO_SUCCESS';


let initialState = {
    posts: [
        {id: 1, message: 'Hi2', likesCount: 12},
        {id: 2, message: 'How', likesCount: 10},
        {id: 3, message: 'Wtf', likesCount: 11}
    ],
    profile: null,
    status: ''
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost]
            };
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            };
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            };
        case SEVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            };
        default:
            return state;
    }
}

export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText });
export const setStatus = (status) => ({ type: SET_STATUS, status });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const savePhotoSuccess = (photos) => ({ type: SEVE_PHOTO_SUCCESS, photos });

export const getProfile = (userId) => {
    return async (dispatch) => {

        if (!userId) {
            let response = await myAPI.getMyData()
            userId = response.data.data.id;
            response = await userAPI.getUserData(userId)
            dispatch(setUserProfile(response))
        }
        else {
            let response = await userAPI.getUserData(userId)
            dispatch(setUserProfile(response))
        }
    }
}

export const getStatus = (userId) => async (dispatch) => {

    if (!userId) {
        let response = await myAPI.getMyData()
        userId = response.data.data.id;
        response = await userAPI.getStatus(userId)
        dispatch(setStatus(response.data))
    } else {
        let response = await userAPI.getStatus(userId)
        dispatch(setStatus(response.data))
    }
}

export const updateStatus = (status) => async (dispatch) => {
    let response = await userAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}

export const savePhoto = (file) => async (dispatch) => {
    let response = await userAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}

// в thunk приходит dispatch и getState, благодяря getState можно
// получить вообще весь state Stora Redux, из которого можно
// получить любой отдельный state(по названию где комбайним)
// а из него уже любые данные
export const saveProfile = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await userAPI.saveProfile(profile)
    if (response.data.resultCode === 0) {
        dispatch(getProfile(userId))
    } else {
        let str = response.data.messages[0]
        str = str.slice(str.indexOf(">", 0) + 1, -1).toLowerCase();

        dispatch(stopSubmit("editProfile", {"contacts": {[str]: str + ' invalid field'} }))
        return Promise.reject(response.data.messages[0])
    }
}


export default profileReducer;
