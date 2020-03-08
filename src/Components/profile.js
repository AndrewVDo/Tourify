import React,{useState, useEffect} from "react";
import {Button, Avatar, Container} from "@material-ui/core";

import "../StyleSheets/index.css"


const Profile = (props) => {
    const [profile, setProfile] = useState();

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
        .catch(err => console.log(err));


    return (
        <Container className="container">
            <div className = 'profileHeader'>
                <Avatar id="avatar">A</Avatar>
                <h1 id="name">Name: </h1>
            </div>
            <div><hr/></div>
            <div className='profileBody'>
                <p>Weight: </p>
                <p>email: </p>
                <p>nationality:</p>
                <p>user type:</p>
                <p>uid:</p>
            </div>
            <Button variant="contained">Edit</Button>
        </Container>

    )
};

export default Profile;
