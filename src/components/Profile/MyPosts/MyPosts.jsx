import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators";
import {Textarea} from "../../common/FormControls/FormsControls";

// memo обретка не рендерит внутреннее содержимое(компонент)
// если не изменились данные(props)
const MyPosts = React.memo(props => {
    let postsElements = props.posts
        .map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>)

    const addNewPost = (value) => {
        props.addPost(value.newPostText); // .newPostText потому что в Field указали name поля именно так
    }

    return (
        <div className={s.posts}>
            <h3>Мои посты</h3>
            {/*при submit т.е. при нажатии на кнопку сработает наша самописная ф-я в которую придет значение из redux-form*/}
            <AddPostFormRedux onSubmit={addNewPost}/>
            <div>
                {postsElements}
            </div>
        </div>
    )
})

// запускаем заранее функцию валидатора на колличество симовлов
const maxLength10 = maxLengthCreator(10);

const AddPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {/*Textarea ниже это компонент в который попадут пропсы от Field автоматом*/}
                {/*данный компонент создаем сами и импортим сюда*/}
                {/*validate это встроенный параметр в который передаем наши созданные валидаторы*/}
                <Field component={Textarea}
                       name="newPostText"
                       placeholder="my posts"
                       className={s.textarea}
                       validate={[required, maxLength10]}
                />
            </div>
            <button className={s.addPost}>Добавить пост</button>
        </form>
    )
}

const AddPostFormRedux = reduxForm({
    form: "ProfileAddNewPostForm"
})(AddPostForm)


export default MyPosts;
