import React from "react";

const ProfileInfo = (props) => {
    return (
        <div id="profile">
            <h1>username : {props.username}</h1>
            <h1>password : {props.password}</h1>
        </div>
    );
}
export default ProfileInfo;