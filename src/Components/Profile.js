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

   useEffect(() => {
       try{
           blockFetch()
               //.then(resp => resp.json())
               .then(data => setProfile(data.resDocument))
           async function blockFetch(){
               let respString = await fetch('/profile-info',{
                   method: 'POST',
                   headers:{
                       'Accept': 'application/json',
                       'Content-type' : 'application/json'
                   },
                   body: JSON.stringify({
                       uid: props.match.params.userId
                   })
               })
               return await respString.json()
           }
       }
       catch(err) {
           console.error('err: ', err)
       }
    },[]);

        if(toUpdate){ //intial : false
            return <Redirect to='/update-profile'/>
        }

        return (<div id="profile">
                <div id='profile-header'>
                    <td className="profile-image"><Avatar id="avatar" src={profile.profilePicUrl}/></td>
                    <td className="profile-image">
                        <ReactCountryFlag
                        id='country-image'
                        countryCode={getCode(profile.nationality)}
                        svg
                        cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                        cdnSuffix="svg"
                        />
                    </td>
                </div>
                    <h1 id="name">{profile.alias}</h1>
                <div>
                    <hr/>
                </div>
                <div className='profile-body'>
                    <p>Age: {profile.age}</p>
                    <p>Weight: {profile.weight}</p>
                    <p id="nationality">Nationality: {profile.nationality}</p>
                    <p>user type: {profile.userType}</p>
                </div>
                <Button variant="contained" onClick={() => setToUpdate(true)}>Edit</Button>
            </div>
        )
};

export default Profile;
