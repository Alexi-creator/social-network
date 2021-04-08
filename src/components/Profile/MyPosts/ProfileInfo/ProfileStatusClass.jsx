import React from 'react';
import s from './ProfileInfo.module.css';


class ProfileStatusClass extends React.Component {

    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        // this.setState - данный метод запускаеться ассинхронно, поэтому то что будет написано ниже может выполниться 1-м, поэтому нельзя ссылаться на результат данного вызова
        this.setState({ // this.setState здесь указываем что конкретно меняем при вызове данного метода
            editMode: true  // перезаписываем свойство editMode из state
        })
    }

    // Метод классовый

    // deactivateEditMode() {
    //     this.setState({
    //         editMode: false
    //     })
    // }

    // метод как стрелочная ф-я
    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status)
    }

    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    // данная ф-и срабатывает когда компонент обновился, например из за изменений state
    componentDidUpdate(prevProps, prevState) {
        // prevProps, prevState - это аргументы в которые попадут значения
        // старых state и props до изменения компоненты и ее перерисовки

        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (
            <div className={s.profile}>
                {!this.state.editMode &&
                    <div>
                        {/*/!*{this.activateEditMode.bind(this)}*!/ это если использовать методы в классе, а если стрелочные ф-и то нен нужно bind*/}
                        {/* если не сделать .bind(this) то в this будет span, а нам нужно чтоб в this был class ProfileStatusClass*/}
                        <span onDoubleClick={this.activateEditMode} className={s.status}>{this.props.status || 'no status'}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.status}/>
                    </div>
                }
            </div>
        )
    }
}


export default ProfileStatusClass;
