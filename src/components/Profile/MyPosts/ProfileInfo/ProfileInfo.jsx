import React, {useState} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../../common/Preloader/Preloader";
import userPhotoDefault from "../../../../assets/images/user.png";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDataFormReduxForm from "./ProfileDataForm";


const ProfileInfo = (props) => {

    let [editMode, setEditMode] = useState(false)

    if (!props.profile) {
       return <Preloader/>
    }

    const onSubmit = (formData) => {
        props.saveProfile(formData)
            .then(() => {
                setEditMode(false)
            })
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <div className={s.addPhoto}>
                    <img className={s.img + ' ' + s.elem} src={props.profile.photos.large || userPhotoDefault} alt=""/>
                    {/*ниже input это для взятия файла(фото) из компа, событие onChange сработает когда какойнибудь файл выберем
                    данный инпут появиться только если мы на своем профиле а не на чужом props.isOwner*/}
                    {props.isOwner && <input className={s.input_foto} type={'file'} onChange={props.onMainPhotoSelected}/>}
                </div>

                { editMode
                    ? <ProfileDataFormReduxForm initialValues={props.profile} {...props} onSubmit={onSubmit} />
                    : <ProfileData {...props} goToEditMode={ () => {setEditMode(true)} } />
                }
            </div>
        </div>
    )
}

// данные профиля статус работа итд все что правее фото
const ProfileData = (props) => {
    return (
        <div className={s.aboutWrap}>

            { props.isOwner && <button className={s.button} onClick={props.goToEditMode}>Редакатировать профиль</button> }

            <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
            <div className={s.name}>My Name is: <span>{props.profile.fullName}</span></div>
            <div className={s.about}>Обо мне: {props.profile.aboutMe}</div>
            <div>Поиск работы: {props.profile.lookingForAJob
                ? <img className={s.thumbs} src='https://svgsilh.com/svg/159474.svg'/>
                : <img className={s.thumbs} src='https://w7.pngwing.com/pngs/121/181/png-transparent-thumb-signal-font-awesome-others-thumbnail.png'/>}
            </div>
            <div>Подробнее о поиске работы: {props.profile.lookingForAJobDescription} </div>

            {/*метод для итерации по объекту! который возвращает массив!!!*/}
            <div>
                <b className={s.contacts}>Contacts:</b> {Object.keys(props.profile.contacts).map(key => {
                    return <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key]} />
            })}
            </div>
        </div>
    )
}


// компонент возвращающий ключ значение(контактов профиля) объекта(профиль) из API
const Contact = ({contactTitle, contactValue}) => {
    return <div className={s.links}> <b>{contactTitle}</b>: {contactValue} </div>
}

export default ProfileInfo;
