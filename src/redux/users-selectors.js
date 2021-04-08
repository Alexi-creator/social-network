import {createSelector} from "reselect";

// UsersContainer, там быди данные свойства стейта


// пример сложного селекта с большими вычислениями

// эта ф-я просто достает нужные данные из state
const getUsersSelector = (state) => {
    return state.usersPage.users;
}

// на вход принимает простые селекторы и ф-ю которая имеет доступ до элементов
// она же вызываеться в mapStateToProps и в нее передаеться state
// селектора который прописали как первый аргумент, через запятую
// можно перечислять простые селекторы которые нужно проверить
// не изменились ли данные
export const getUsers2 = createSelector(getUsersSelector, (users) => {
    users.filter(u => true) // это ф-я которая будет перезапускаться если, нужно реально изменить стейт
})



// ниже это обычные селекторы без бибилиотеки reselect

export const getUsers = (state) => {
    return state.usersPage.users;
}

export const getPageSize = (state) => {
    return state.usersPage.pageSize;
}

export const getTotalUsersCount = (state) => {
    return state.usersPage.totalUsersCount;
}

export const getCurrentPage = (state) => {
    return state.usersPage.currentPage;
}

export const getIsFetching = (state) => {
    return state.usersPage.isFetching;
}

export const getFollowingInProgress = (state) => {
    return state.usersPage.followingInProgress;
}


