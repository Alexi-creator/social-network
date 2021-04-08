import React from 'react'; // импорт модуля из папки nodemodules(т.к. нет ./ перед названием модуля) для jsx
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfile, getStatus, savePhoto, saveProfile, updateStatus} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";


class ProfileContainer extends React.Component {

    // общая функция которая должна вызываться в разных жизненных циклах компоненты
    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
        }

        this.props.getProfile(userId);
        this.props.getStatus(userId);
    }

    componentDidMount() {
        this.refreshProfile()
    }

    // метод для изменения фото своего профиля
    onMainPhotoSelected = (e) => {
        if (e.target.files[0]) {
            this.props.savePhoto(e.target.files[0])
        }
    }

    // после обновления комопненты из за смены url(конца) перерисовываем компоненту с новыми данными
    // чтобы не было бесконечного срабатывания данной ф-и из круговорота зациклиности запроса и перерисовки
    // нужно ставить обязательно условие изменились ли props
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return (
            <div>
                <Profile {...this.props}
                         isOwner={!this.props.match.params.userId}
                         profile={this.props.profile}
                         status={this.props.status}
                         updateStatus={this.props.updateStatus}
                         onMainPhotoSelected={this.onMainPhotoSelected}
                         savePfofile={this.props.savePfofile}
                />
            </div>
        )
    }

}


// это функция HOC которая создает контейнерную функцию которая
// будет возвращать либо нашу контейнрную ф-ю то что выше
// либо делать redirect в зависимости от ситуации
// let AuthRedirectComponent = withAuthRedirect(ProfileContainer);


let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId
});

// новая компонента обертка контейнерная которая вызывает
// AuthRedirectComponent и передает доп. новые параметры
// в нашем случае конечный адрес строки в браузере
// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);


// данная компонента вызывает компоненту WithUrlDataContainerComponent
// и передает props в виде state из store redux и ф-й callback
// которые потом понадобяться чистой презентационной компоненте User
export default compose(
    connect((mapStateToProps),{getProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)

