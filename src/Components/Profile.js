import React,{useState, useEffect} from "react";

const Profile =()=>{
    const [name, setName] = useState('');
    // probably remove later, POC
    const [password, setPassword] = useState('');

    const [role, setRole] = useState('Rider');
    const [userId, setUserId] = useState('N/A')
    const [birthday, setBirthday] = useState('01/01/1970');
    const [email, setEmail] = useState('a@a.com');


    let getresp = fetch('/getProfile')
        .then(resp => resp.json())
        .then(json =>{
            console.log(json.username);
            setName(json.username);
            setPassword(json.password);
        })

    return (
        <div id="profile">
            <h1>username : {name}</h1>
            <h1>password : {password}</h1>
            <p>{role}</p>
            <h2>About</h2>
            <p>User id: {userId}</p>
            <p>Date Of Birth: {birthday}</p>
            <p>Email: {email}</p>
        </div>
    );
}



export default Profile;