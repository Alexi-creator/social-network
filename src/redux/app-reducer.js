import {getAuth} from "./auth-reducer";

const INITIALIZED_SACCESS = 'INITIALIZED_SACCESS';

let initialState = {
    initialized: false
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SACCESS:
            return {
                ...state,
                initialized: true
        };
        default:
            return state;
    }
}

export const initializedSuccess = () => ({ type: INITIALIZED_SACCESS});

export const initializeApp = () => {
    return (dispatch) => {
        // после выполнения диспатча он может вернуть то что мы захотим
        // это нужно указать в санке getAuth в виде return
        let promise = dispatch(getAuth())
        promise.then(() => {
            // запрос выполняеться и в любом случае будет ответ, либо авторизованы либо нет
            // и когда он выполнился можем делать: это инициализация т.е. в любом случае поменяем флаг инициализации на true даже если не авторизованы
            dispatch(initializedSuccess())
        })
    }
}





export default appReducer;
