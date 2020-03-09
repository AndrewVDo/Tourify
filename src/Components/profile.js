import React,{useState, useEffect} from "react";
import {Button, Avatar, Container} from "@material-ui/core";

import "../StyleSheets/index.css"


const Profile  = (props) => {
    const [profile, setProfile] = useState({
        alias: '',
        dateOfBirth: '',
        nationality: '',
        profilePicUrl: "",
        userType: '',
        weight : 0});

   useEffect(() => {
       fetch(`/profileInfo`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uid: props.uid
            })
        })
        .then(resp => resp.json())
            .then(data => {setProfile(data)})
        .catch(err => console.log(err));
    },[]);
    return (
        <Container className="container">
            <div className = 'profileHeader'>
                <Avatar id="avatar" src = {profile.profilePicURL}/>
                <h1 id="name">Name: {profile.alias}</h1>
            </div>
            <div><hr/></div>
            <div className='profileBody'>
                <p>Weight: {profile.weight}</p>
                <p>nationality: {profile.nationality}</p>
                <p>user type: {profile.userType}</p>
            </div>
            <Button variant="contained">Edit</Button>
        </Container>

    )
};

export default Profile;
