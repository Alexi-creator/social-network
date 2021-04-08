import './App.css'; // импортруем стили, ./ означает что смотрим в текущей директории а не в дирктории nodemodules
import {HashRouter, Redirect, Route, Switch, withRouter} from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import ProfileContainer from "./components/Profile/ProfileContainer";
import React from "react";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import {compose} from "redux";
import store from "./redux/redux-store";
import {withSuspense} from "./hoc/withSuspense"; // hoc обертка для ленивых загрузок

// "ленивая загрузка по требованию пользователя, т.е после действий пользователя которых понадобиться этот файл"
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));

const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));



class App extends React.Component {

    // метод для перехвата всех ошибок промисов

    catchAllUnhandledErrors = (promiseRejectionEvent) => {
        console.error(promiseRejectionEvent)
    }

    componentDidMount() {
        this.props.initializeApp();
        // в componentDidMount имеем право сделать sideffect, зная что компонента точно вмонтировалась в dom
        // можно обратиться к dom
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    // когда компонента будет демонтироваться (при переходе на другую страницу например)
    // нужно отписаться от события unhandledrejection выше, чтобы не оставлять мусор!
    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader />
        }

        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    {/*Switch помогает чтобы не писать exact для путей в Route
                    т.е если есть путь и путь с "хвостом" (/music и /music/hvost)
                    то будут отрисовываться 2 компоненты и /music и /music/hvost

                    Решить этот вопрос можно 2 способами либо писать exat либо
                    обернуть Switch все route (либо использовать оба способа одновременно)
                    Чтобы не было конфликтов нужно писать роуты с хвостами выше
                    чем простые роуты без хвостов, иначе будут отображаться только
                    роуты без хвостов, т.к. он имеет "приоритет" выше*/}
                    <Switch>
                        <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                        {/*ленивая загрузка*/}
                        <Route path='/dialogs' render={() => {
                            return <React.Suspense fallback={<Preloader/>}>
                                <DialogsContainer/>
                            </React.Suspense>
                        }}/>
                        <Route path='/news' render={() => <News/>}/>
                        <Route path='/music' render={() => <Music/>}/>
                        <Route path='/settings' render={() => <Settings/>}/>
                        {/*<Route path='/users' render={() => <UsersContainer/>}/>*/}
                        {/*универсальный hoc withSuspense для ленивой загрузки*/}
                        <Route path='/users' render={withSuspense(UsersContainer)}/>
                        <Route path='/login' render={() => <LoginPage/>}/>
                        {/*exact указывет на точное совпадение пути*/}
                        <Route exact path='/'>
                            <Redirect to="/profile"/>
                        </Route>

                        {/*path='*' означает что если в браузерной строке будет
                        путь который не описали здесь то сработает данный роут*/}
                        <Route path='*' render={() => <div>404 not found</div>}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})


let AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

/*HashRouter вместо BrowserRouter, он помогает с тем, что если перезрагрузить страницу уже на хостинге, то сервер будет пытаться отдать Index.html по данному пути которого нет, а мы подставим #*/
const SamuraiJSApp = (props) => {
    return <HashRouter>
        {/*Provider оборачивает все наше приложение как родительская компонента чтобы передать store от redux
        и любая компонента которая находится внутри может подключиться к redux данным
        с помощью connect hoc*/}
        <Provider store={store}>
            <Route path='/' render={ () => <AppContainer />} />
        </Provider>
    </HashRouter>
}

export default SamuraiJSApp;
