import React,{useState, useEffect} from "react";
import {Button, Avatar, Container} from "@material-ui/core";
import ReactCountryFlag from 'react-country-flag'
import {getCode} from 'country-list'
import {Redirect} from 'react-router-dom'

import "../StyleSheets/Profile.css"

//TODO: PASS UID WITH PROPS TO SPECIFY WHICH TO UPDATE
//TODO: enable/ disable edit button based on whether you are viewing your profile or another rider's profile
const Profile  = (props) => {

    const [profile, setProfile] = useState({
        alias: '',
        age: '',
        nationality: '',
        profilePicUrl: "",
        userType: '',
        weight : ''});
    const [toUpdate, setToUpdate] = useState(false)

    function handleClick(){
        setToUpdate(true);
    }
   useEffect(() => {
       fetch(`/profileInfo`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uid: props.match.params.userId
            })
        })
        .then(resp => resp.json())
           .then(data => {
               setProfile(data.resDocument)
           })
        .catch(err => console.log(err));
    },[]);

        if(toUpdate){ //intial : false
            return <Redirect to='/UpdateProfile'/>
        }
        else {
            return (
            <div id="profile">
                <div className='profileHeader'>
                    <Avatar id="avatar" src={profile.profilePicUrl}/>
                    <h1 id="name">{profile.alias}</h1>
                </div>
                <div>
                    <hr/>
                </div>
                <div className='profileBody'>
                    <p>Age: {profile.age}</p>
                    <p>Weight: {profile.weight}</p>
                    <p id="nationality">Nationality: {profile.nationality}</p>
                    <ReactCountryFlag id="flag" countryCode={getCode(profile.nationality)}/>
                    <p>user type: {profile.userType}</p>
                </div>
                <Button variant="contained" onClick={handleClick}>Edit</Button>
            </div>
            )
        }
};

export default Profile;
