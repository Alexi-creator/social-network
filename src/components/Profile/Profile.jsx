import React from 'react'; // импорт модуля из папки nodemodules(т.к. нет ./ перед названием модуля) для jsx
import ProfileInfo from "./MyPosts/ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";


const Profile = (props) => {
    return (
        <div>
            <ProfileInfo onMainPhotoSelected={props.onMainPhotoSelected} isOwner={props.isOwner} profile={props.profile} status={props.status} updateStatus={props.updateStatus} saveProfile={props.saveProfile} />
            <MyPostsContainer />
        </div>
    );
}

export default Profile;
