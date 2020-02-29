import React,{useState, useEffect} from "react";
import {Card, Button, Avatar, Container} from "@material-ui/core";
import classes from "@material-ui/core/Avatar"
import "/home/at/Documents/470/proj/tourify-project/src/index.css"


const Profile = (props) => {
    const [profile, setProfile] = useState({
        name: '',
        password: ''
    });
    //placeholder
    let username_passed_in = 'asdf';
    useEffect(() => {
        fetch(`/getProfile?username=${encodeURIComponent(username_passed_in)}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(resp => resp.json())
            .then(response => {
                console.log(response);
                setProfile({
                    name: response.username,
                    password: response.password
                })
            })
    }, []);
    return (
        <Container className="container">
            <div className = 'profileHeader'>
                <Avatar id="avatar">A</Avatar>
                <h1 id="name">{profile.name}</h1>
            </div>
            <div><hr/></div>
            <div className='profileBody'>
                <p>Date of Birth: {profile.password}</p>
                <p>email: {profile.name}</p>
                <p>Height: 9001 lbs</p>
            </div>
            <Button variant="contained" onClick={updateProfile}>Edit</Button>
        </Container>)
}

function updateProfile(){
    return alert("hello");
}

export default Profile;