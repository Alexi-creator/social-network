import React from "react";
import {createField, Input, Textarea} from "../../../common/FormControls/FormsControls";
import {reduxForm} from "redux-form";
import style from "../../../common/FormControls/FormsControls.module.css";

const ProfileDataForm = ({handleSubmit, profile, error}) => {

    return (
        <form onSubmit={handleSubmit}>

            <button className={style.button}>Сохранить данные</button>

            { error
                ? <div className={style.formSummaryError}>
                    {error}
                </div>
                : ""
            }

            <div> My Name is: { createField("Full name", "fullName", [], Input) } </div>

            <div> о поиске работы: { createField("о поиске работы", "lookingForAJobDescription", [], Textarea) } </div>

            <div> обо мне: { createField("обо мне", "aboutMe", [], Textarea) } </div>

            <div> Поиск работы: { createField("", "lookingForAJob", [], Input, {type: "checkbox"}) } </div>

            {/*метод для итерации по объекту! который возвращает массив!!!*/}
            <div>
                <b>Contacts</b>: {Object.keys(profile.contacts).map((key, index) => {
                return <div key={index}>
                    <b>{key}: {createField(key, "contacts." + key, [], Input)} </b>
                </div>
            })}
            </div>
        </form>
    )
}

const ProfileDataFormReduxForm = reduxForm({
// обязательно уникальное имя для нужной формы
form: 'editProfile'
})(ProfileDataForm)



export default ProfileDataFormReduxForm;
