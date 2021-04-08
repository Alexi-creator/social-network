import {myAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null // if null, then captcha is not required
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        // для 2-х случаев применяем одно и тоже
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}

// ACTION CREATOR
export const setAuthUserData = (userID, email, login, isAuth) => ({ type: SET_USER_DATA, payload: {userID, email, login, isAuth} });
export const getCaptchaUrlSuccess = (captchaUrl) => ({ type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl} });

// thunk
export const getAuth = () => {
    return async (dispatch) => {
        let response = await myAPI.getMyData();    // return нужен чтобы вернуть его в appReducer где вызываем
        if (response.data.resultCode === 0) {
            let {id, login, email} = response.data.data;
            dispatch(setAuthUserData(id, email, login, true))
        }

    }
}

export const login = (email, password, rememberMe) => {
    return async (dispatch) => {
        let response = await myAPI.login(email, password, rememberMe);
        if (response.data.resultCode === 0) {
            dispatch(getAuth())
        } else {
            if (response.data.resultCode === 10) {
                dispatch(getCaptchaUrl())
            }
            let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
            let action = stopSubmit("login", {_error: message}) // stopSubmit это встроенная ф-и от redux form, в нее передаем название нужной формы, для каждой формы мы придумывали! свое название, а вторым параметром объект с "проблемными" полями, т.е. если поле не валидно то пишем ошибку
            // вместо ошибки на поле email, можно указать просто общую ошибку _error: "email or password is wrong"
            dispatch(action)
            /*dispatch(stopSubmit("login", {email: "email is wrong"})) сокращенный вариант */
        }
    }
}

// для капчи
export const getCaptchaUrl = () => {
    return async (dispatch) => {
        const response = await securityAPI.getCaptchaUrl();
        const captchaUrl = response.data.url;
        dispatch(getCaptchaUrlSuccess(captchaUrl));
    }
}


export const logout = () => {
    return async (dispatch) => {
        let response = await myAPI.logout();
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false))
        }

    }
}



export default authReducer;
