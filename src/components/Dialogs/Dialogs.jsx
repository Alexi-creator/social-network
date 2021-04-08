import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Redirect} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../common/FormControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators";


const Dialogs = (props) =>  {

    let state = props.dialogsPage;

    // массив с диалогами, делаем его из массива с именами(например данный массив придет из БД)
    // далее этот массив подствим в jsx, ниже в коде
    let dialogsElements = state.dialogs.map( d => <DialogItem key={d.id} name={d.name} id={d.id}/> )

    let messagesElements = state.messages.map( m => <Message key={m.id} message={m.message}/> )


    let addNewMessage = (values) => {
        props.sendMessage(values.newMessageBody) // values это объект с полями из формы, название newMessageBody это одно из полей под тегом name в форме
    }

    // проверка, если мы неавторизованы то переходим на другую страницу
    if (!props.isAuth) {
        return <Redirect to={"/login"} />;
    }

    return (
        <div>
            <div className={s.dialogs}>

                <div className={s.dialogsItems}>

                    {/*это массив с диалогами который jsx прочитает как отдельные теги
                    это будут теги компоненты которые тоже запустится и отрисуются*/}
                    {dialogsElements}

                </div>

                <div className={s.messages}>
                    <div>
                        {messagesElements}
                    </div>
                    <AddMessageFormRedux onSubmit={addNewMessage} />
                </div>
            </div>
        </div>
    )
}

// запускаем заранее функцию валидатора на колличество симовлов
const maxLength50 = maxLengthCreator(50);

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea}
                       name="newMessageBody"
                       validate={[required, maxLength50]}
                       placeholder="Enter your message" />
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

// hoc обетка встроенная reduxForm
const AddMessageFormRedux = reduxForm({
    form: "dialogAddMessageForm"
})(AddMessageForm)

export default Dialogs;
