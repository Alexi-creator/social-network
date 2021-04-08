import React, {useEffect, useState} from 'react';
import s from './ProfileInfo.module.css';


const ProfileStatusWithHooks = (props) => {

/*
    // используем hook useState который возвращает массив из 2-х элементов
    // со значением false это как в локальном state хранить значение
    let stateWithSetState = useState(false)
    // первое значение массива это то что положили т.е. false
    let editMode = stateWithSetState[0] // false
    let setEditMode = stateWithSetState[1] // здесь лежит ф-я которая может менять значение данного hook'а
*/
    // короткая запись того что выше, с помощью деструктуризации:
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    // данная встроенная ф-я срабатывает сразу же когда компонента отрисовалась
    // это как ComponentDidMount в классовой к-те, только useEffect срабатывает
    // еще и при каждой последующей перерисовке или изменении props из вне
    useEffect(() => {
        setStatus(props.status) // устанавливаем измененный status(т.к от сервера ответ может прийти позже и когда случиться перерисовка, useState(props.status) уже не сработает, он запомнит только старое значение, и его нужно менять вручную)
    },[props.status]) // изменяем локальный стейт при поступлении новых данных из вне(в нашем случае изменился redux стейт - props после обновления статуса dispatch)
                            // если не написать [props.status] то useEffect будет срабатывать каждый раз при перерисовке, а если [props.status] то он сработает если придет измененный props.status
    const activateEditMode = () => {
        setEditMode(true) // ф-я которая меняет значение editMode хука
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            {!editMode &&
            <div>
                <b>Status: <span onDoubleClick={activateEditMode}
                                  className={s.status}>{props.status || 'no status'}
                            </span>
                </b>
            </div>
            }
            {editMode &&
            <div>
                <input onChange={onStatusChange}
                       autoFocus={true}
                       onBlur={deactivateEditMode}
                       value={status}/>
            </div>
            }
        </div>
    )
}





export default ProfileStatusWithHooks;
