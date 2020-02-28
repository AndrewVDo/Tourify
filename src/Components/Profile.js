import React,{useState, useEffect} from "react";
import ProfileInfo from "./ProfileInfo";

const Profile = (props) => {

    const [name, setName] = useState('');
    // probably remove later, POC
    const [password, setPassword] = useState('');

    const [role, setRole] = useState('Rider');
    const [userId, setUserId] = useState('N/A')
    const [birthday, setBirthday] = useState('01/01/1970');
    const [email, setEmail] = useState('a@a.com');



    //placeholder
    let username_passed_in = 'asdf';

    let respUserName;
    let respPassword;
    console.log('hi2')
    getProfile(username_passed_in)
        .then(resp => {
            respUserName = resp.username;
            respPassword = resp.password;
            //setName(resp.username);
            //setPassword(resp.password);
            <ProfileInfo username = {respUserName} password = {respPassword}/>
        });

    return <ProfileInfo/>;
    /* variables to be added to profile info
            <h1>username : {name}</h1>
            <h1>password : {password}</h1>
            <p>{role}</p>
            <h2>About</h2>
            <p>User id: {userId}</p>
            <p>Date Of Birth: {birthday}</p>
            <p>Email: {email}</p>
     */
}

var getProfile = async (username) =>{
    return fetch(`/getProfile?username=${encodeURIComponent(username)}`, {
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(resp => resp.json())
}

export default Profile;