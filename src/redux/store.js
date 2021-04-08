import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi2', likesCount: 12},
                {id: 2, message: 'How', likesCount: 10},
                {id: 3, message: 'Wtf', likesCount: 11}
            ],
            newPostText: 'it-kama'
        },
        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Dimych'},
                {id: 2, name: 'Andrey'},
                {id: 3, name: 'Sveta'},
                {id: 4, name: 'Sasha'},
                {id: 5, name: 'Victor'},
                {id: 6, name: 'Valera'},
                {id: 7, name: 'Alexi'}
            ],
            messages: [
                {id: 1, message: 'Hi'},
                {id: 2, message: 'How'},
                {id: 3, message: 'Wtf!'}
            ],
            newMessageBody: ''
        },
        sidebar: {
            friends: [
                {id: 1, name: 'Dimych'},
                {id: 2, name: 'Andrey'},
                {id: 3, name: 'Sveta'}
            ]
        }
    },
    _callSubscriber() {
        console.log('state changed');
    },

    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },


    dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._state.sidebar = sidebarReducer(this._state.sidebar, action)

        this._callSubscriber(this._state);

    }

}


export default store;
