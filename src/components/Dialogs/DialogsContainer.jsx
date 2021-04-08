import {sendMessageCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";


let mapStateToProps = (state) => { // возвращает объект, это вместо атрибутов props, state это store.getState() из redux, библиотека react-redux сама знает откуда взять state
    return {
        dialogsPage: state.dialogsPage
    }
}

let mapDispatchToProps = (dispatch) => { // тоже самое только возвращает коллбак ф-ии из redux store.dispatch
    return {
        sendMessage: (newMessageBody) => {
            dispatch(sendMessageCreator(newMessageBody))
        }
    }
}



// let AuthRedirectComponent = withAuthRedirect(Dialogs);

/*
const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);
// создается контейнерная компонента в которую передаем
// атрибуты props и компоненту которую нужно вернуть отрисовать
// в компоненте Dialogs в props будет сидеть: props.dialogsPage
// и ф-ии updateNewMessageBody, sendMessage
*/

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);
