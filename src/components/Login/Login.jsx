import React from 'react';
import {reduxForm} from "redux-form";
import {createField, Input} from "../common/FormControls/FormsControls";
import {required} from "../../utils/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import style from "../common/FormControls/FormsControls.module.css";

// вместо props можно делать деструктуризацию ({})
const LoginForm = ({handleSubmit, error, captchaUrl}) => {
    return (
        // props.handleSubmit дання ф-я срабатывает при нажатии на button в LoginReduxFrom,
        // там отменяеться действие по умолчанию - перезагрузка страницы, и передача данных с полей
        // и далее действие onSubmit передаеться на функцию которую мы сами описали в компоненте Login
        <form onSubmit={handleSubmit}>

            { createField("Email", "email", [required], Input) }

            { createField("Password", "password", [required], Input, {type: "password"}) }

            { createField(null, "rememberMe", [], Input, {type: "checkbox"}, "remember me") }

            { captchaUrl && <img src={captchaUrl} /> }

            { error
                ? <div className={style.formSummaryError}>
                    {error}
                  </div>
                : ""
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

// hoc обертка для формы которая будет делать всю работу
const LoginReduxFrom = reduxForm({
    // обязательно уникальное имя для нужной формы
    form: 'login'
})(LoginForm)


const Login = ({login, isAuth, captchaUrl}) => {
    // при отправке формы, сработает вот эта ф-я:
    // formData это объект с полями форм
    const onSubmit = (formData) => {
        login(formData.email, formData.password, formData.rememberMe)
    }

    if (isAuth) {
        return <Redirect to={"/profile"} />
    }

    return <div>
        <h1>LOGIN</h1>
        <LoginReduxFrom onSubmit={onSubmit} catchaUrl={captchaUrl} />
        {/*передаем в пропсы ф-ю onSubmit={onSubmit}*/}
    </div>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})


export default connect(mapStateToProps, {login})(Login);
