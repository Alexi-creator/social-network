import React from "react";
import styles from "./FormsControls.module.css";
import {Field} from "redux-form";


const FormControl = ({input, meta: {touched, error}, element, ...props}) => {

    const hasError = touched && error // проверка на то касались ли поля и есть ли ошибка валидации
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>
                {React.createElement(element, {...input, ...props})}
            </div>
            { hasError && <span>{error}</span> }
        </div>
    )
}

export const Textarea = (props) => {
    return <FormControl {...props} element="textarea"></FormControl>
}

export const Input = (props) => {
    return <FormControl {...props} element="input"></FormControl>
}

                                    // в props передаем остаточные параметры
export const createField = (placeholder, name, validators, component, props = {}, text = '') => (
    <div>
        <Field placeholder={placeholder}
               name={name}
               validate={validators}
               component={component}
               {...props}
        />
        {text}
        {/* ..props деструктуризируем объект в которые передаем остаточные не повторяющиеся параметры*/}
    </div>
)
