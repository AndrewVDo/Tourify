import React,{useState, useEffect} from "react";
import Button from "@material-ui/core/Button";

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
        <div>
            <h1>username : {profile.name}</h1>
            <h1>password : {profile.password}</h1>
            <Button variant="contained">Update</Button>
        </div>)
}

export default Profile;