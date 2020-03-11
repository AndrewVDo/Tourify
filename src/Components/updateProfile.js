import React,{useState, useEffect} from "react";
import {Container, Button, TextField, Select, MenuItem} from "@material-ui/core";
import {getNames, getCode} from 'country-list'

import "../StyleSheets/UpdateProfile.css"
import DateFnsUtils from "@date-io/date-fns";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";

import {Redirect} from 'react-router-dom'

const nationalityList = getNames()

//TODO RECIEVE UID IN PROPS TO UPDATE, USE UID TO SPECIFY WHICH PROFILE TO GO TO

const UpdateProfile = (props) => {
    const [name, setName] = useState("speed racer");
    const [weight, setWeight] = useState(0);
    const [age, setAge] = useState(0);
    const [nationality, setNationality] = useState("canadian");
    const [toProfile, setToProfile] = useState(false)

    function handleClick() {
        console.log("click")
        setToProfile(true);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("/updateProfileInfo", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                //uid: props.uid,
                uid: "WG4iABL5TFQU7XeFiL80ZjaJM1p1",
                name: name,
                weight: weight,
                age: age,
                nationality: nationality
            })
        });
        handleClick()
    }

    if (toProfile) {
        return <Redirect to='/UpdateProfile'/>
    } else {
        return (
            <div id='updateProfile'>
                <div className='profileHeader'>
                    <h1>Update Profile</h1>
                </div>
                <div>
                    <hr/>
                </div>
                <form id="updateProfileForm">
                    <TextField
                        required
                        label="Name"
                        variant="outlined"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <TextField
                        required
                        label="Weight(kg)"
                        type="number"
                        variant="outlined"
                        value={weight}
                        onChange={e => setWeight(e.target.value)}
                    />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            autoOk
                            variant="inline"
                            inputVariant="outlined"
                            label="With keyboard"
                            format="MM/dd/yyyy"
                            value={age}
                            InputAdornmentProps={{position: "start"}}
                            onChange={date => setAge(date)}/>
                    </MuiPickersUtilsProvider>

                    <Select
                        id='nationality'
                        defaultValue={nationalityList[0]}
                        onChange={event => setNationality(event.target.value)}
                    >
                        {nationalityList.map(elem => <MenuItem key={elem} value={elem}>{elem}</MenuItem>)}
                    </Select>
                </form>
                <Button onClick={handleSubmit}>Submit</Button>
            </div>
        )
    }
}
export default UpdateProfile;
