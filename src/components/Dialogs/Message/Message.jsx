import React from 'react';
import s from './../Dialogs.module.css';


const Message = (props) => {
    let text = props.message

    return (
        <div className={s.message}>
            {text}
        </div>
    )
}



export default Message;
