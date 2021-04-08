import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";


let mapStateToPropsForRedirect = (state) => ({
    isAuth: state.auth.isAuth
});

// HOC ф-я, которая проверяет условие в нашем случае авторизованы ли мы
// если да то возвращает целевую компоненту, иначе делает redirect
export const withAuthRedirect = (Component) => {

    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.isAuth) return <Redirect to={"/login"} />

            return <Component {...this.props}/>
        }
    }

    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)


    return ConnectedAuthRedirectComponent;

}
