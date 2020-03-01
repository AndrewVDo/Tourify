import React, {useState, useEffect} from 'react'
import '../StyleSheets/CreateEvent.css'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';

const CreateEvent = (props) => {

    return (
        <div class="CreateEvent">
            <h1 class="title">Create Event</h1>
            <form action = "" method="post">
                <br></br>
                <TextField id="name" label="Event Name" variant="filled"/>
                <br></br><br></br>

                <TextField
                    id="start_time"
                    label="Start Time"
                    type="time"
                    defaultValue="07:30"
                    variant="filled"
                    InputLabelProps={{
                    shrink: true,
                    }}
                />

                <br></br><br></br>

                <TextField
                    id="end_time"
                    label="End Time"
                    type="time"
                    defaultValue="07:30"
                    variant="filled"
                    InputLabelProps={{
                    shrink: true,
                    }}
                />

                <br></br><br></br>

                <Input type="submit" value="Create Event" variant="contained"></Input> <br></br><br></br>
            </form>
        </div>
    )

}

export default CreateEvent;