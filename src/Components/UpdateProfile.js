import React,{useState, useEffect} from "react";
import {Container, Button, TextField} from "@material-ui/core";

import "../index.css"

const UpdateProfile = () => {
    const [name, setName] = useState("speed racer");
    const [weight, setWeight] = useState(0);
    const [age, setAge] = useState(0);
    const [nationality, setNationality] = useState("canadian");

    const handleSubmit = (event) =>{
        event.preventDefault();
        fetch("/updateProfileInfo",{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                weight: weight,
                age: age,
                nationality: nationality
            })
        });
    }


    return (
        <Container className="container">
            <div className = 'profileHeader'>
                <h1>Update Profile</h1>
            </div>
            <div><hr/></div>
            <form id="updateProfileForm">
                <TextField
                    required
                    label="Name"
                    variant="filled"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <TextField
                    required
                    label="Weight(kg)"
                    type="number"
                    variant="filled"
                    value={weight}
                    onChange={e => setWeight(e.target.value)}
                />
                <TextField
                    required
                    label="Age"
                    type="number"
                    variant="filled"
                    value={age}
                    onChange={e => setAge(e.target.value)}
                />
                <TextField
                    required
                    label="Nationality"
                    variant="filled"
                    value={nationality}
                    onChange={e => setNationality(e.target.value)}
                />
            </form>
            <Button onClick={handleSubmit}>Submit</Button>
        </Container>
    )
}

export default UpdateProfile;