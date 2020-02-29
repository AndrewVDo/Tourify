import React, {useState, useEffect} from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';

const CreateEvent = (props) => {

    return (
        <div>
            <form action = "" method="post">
                <br></br>
                <TextField id="name" label="Event Name" variant="filled" color="secondary"/>
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

                <input type="submit" value="Submit"></input> <br></br><br></br>
            </form>
        </div>
    )

}

export default CreateEvent;