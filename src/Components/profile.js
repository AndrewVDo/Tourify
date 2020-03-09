import React,{useState, useEffect} from "react";
import {Button, Avatar, Container} from "@material-ui/core";
import ReactCountryFlag from 'react-country-flag'
import {getCode} from 'country-list'

import "../StyleSheets/index.css"


const Profile  = (props) => {

    const [profile, setProfile] = useState({
        alias: '',
        age: '',
        nationality: '',
        profilePicUrl: "",
        userType: '',
        weight : ''});

   useEffect(() => {
       fetch(`/profileInfo`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                //uid: props.uid
                uid: props.match.params.userId
            })
        })
        .then(resp => resp.json())
           .then(data => {
               console.log(data.resDocument)
               setProfile(data.resDocument)
           })
        .catch(err => console.log(err));
    },[]);
    return (
        <Container className="container">
            <div className = 'profileHeader'>
                <Avatar id="avatar" src = {profile.profilePicUrl}/>
                <h1 id="name">Name: {profile.alias}</h1>
            </div>
            <div><hr/></div>
            <div className='profileBody'>
                <p>Date Of Birth: {profile.age}</p>
                <p>Weight: {profile.weight}</p>
                <p>nationality: {profile.nationality}</p>
                <ReactCountryFlag countryCode={getCode(profile.nationality)}/>
                <p>user type: {profile.userType}</p>
            </div>
            <Button variant="contained">Edit</Button>
        </Container>

    )
};

export default Profile;
