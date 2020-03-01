import React, {useState, useEffect,Component} from 'react'
import '../StyleSheets/CreateEvent.css'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import { Redirect } from 'react-router-dom'
import firebase from './firebase'

class CreateEvent extends Component {
    state = {
        redirect: false
    }

    setRedirect = () => {
        // Grab all form data
        var eventName = document.getElementById('event_name').value;
        var startDate = document.getElementById('start_date').value;
        var startTime = document.getElementById('start_time').value;
        var endDate = document.getElementById('end_date').value;
        var endTime = document.getElementById('end_time').value;

        //split all time and date variables for timestamp creation
        var startTime_parts = startTime.split(':')
        var endTime_parts = endTime.split(':')
        var startDate_parts = startDate.split('-')
        var endDate_parts = endDate.split('-')

        //firebase events collection
        var eventsRef = firebase.firestore().collection("events").doc();

        // create timestamps
        var startDate = new Date(startDate_parts[0], parseInt(startDate_parts[1], 10) - 1, startDate_parts[2], startTime_parts[0], startTime_parts[1])
        var endDate = new Date(endDate_parts[0], parseInt(endDate_parts[1], 10) - 1, endDate_parts[2], endTime_parts[0], endTime_parts[1])

        //input data into firebase
        eventsRef.set({
           event_name: eventName,
           start_time: startDate,
            end_time: endDate
        })

        this.setState({
          redirect: true
        })
    }


    render() {

        if (this.state.redirect) {
            return <Redirect to='/login' />
        }

        return (
            <div class="CreateEvent">
                <h1 class="title">Create Event</h1>
                <form id="event" onSubmit={this.setRedirect}>
                    <br></br>
                    <TextField id="event_name" label="Event Name" variant="filled"/>
                    <br></br><br></br>

                    <TextField
                        id="start_date"
                        label="Start Date"
                        type="date"
                        defaultValue="2020-12-01"
                        variant="filled"
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />

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
                        id="end_date"
                        label="End Date"
                        type="date"
                        defaultValue="2020-12-01"
                        variant="filled"
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />

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

                    <Button type="submit" variant="contained" color="primary">
                    Create Event
                    </Button>
                </form>
            </div>
        )
    }
}

export default CreateEvent;