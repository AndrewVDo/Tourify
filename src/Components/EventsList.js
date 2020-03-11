import React, {useState, useEffect} from "react"
import ReactDOM from 'react-dom'

import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import { styled } from '@material-ui/core/styles';
import { Table } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { Redirect } from 'react-router-dom'
// import {firestore} from './firebase'
import {populateEvents} from './LoginPage/utils'

import '../StyleSheets/EventsList.css'


function ListElements(prop) {
    return (
        <TableRow>
            {/* <td>
                {prop.number}       // link that when clicked on, prompt user to join event
            </td> */}
            <TableCell align="center">
                {prop.name}         {/* link that when clicked on, direct to event page */}
            </TableCell>
            {/* <td>
                {prop.host}         // link that when clicked on, direct to host's profile
            </td>
            <td>
                {prop.numParticipants}
            </td> */}
            <TableCell align="center">
                {prop.startTime}
            </TableCell>
            <TableCell align="center">
                {prop.endTime}
            </TableCell>
            <TableCell align="center">
                <Button className="eventpages">View Event</Button>      {/* need to make GET request along with event # or any identifier */}
            </TableCell>
        </TableRow>
    )
}

//async function EventsList(prop) {
const EventsList = (prop) => {
    const [eventsList, setEventsList] = useState()

    useEffect( () => {
        //async function nested inside because useEffect must be a callback
        async function blockingCall() {
            setEventsList(await populateEvents())
        }
        blockingCall()
    }, [])

    var button_createEvent = null;
    var isAdmin = true;
    // if (userData.get(userType) == "Event Organizer") {
    if (isAdmin) {
        button_createEvent = <Button id="createeventbutton">Create New Event</Button>
    }

    var button_viewProfile = <Button id="viewprofilebutton">View Your Profile</Button>

    const buttons = (
        <div className="btn-group">
            {button_viewProfile}
            {button_createEvent}
        </div>
    )

    if (eventsList) {
        return (
            <div className="listofevents">
                {/* <React.Fragment> */}
                    {buttons}
                {/* </React.Fragment> */}
                <TableContainer component={Paper}>
                    <Table border="1" id="listofevent">
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan="4" align="center">Ongoing Events</TableCell> {/* 7 in total */}
                            </TableRow>
                            <TableRow>
                                {/* <th width="">Event #</th> */}
                                <TableCell width="" align="center">Event Name</TableCell>
                                {/* <th width="">Host</th>
                                <th width=""># Participants</th> */}
                                <TableCell width="" align="center">Event Start Time</TableCell>
                                <TableCell width="" align="center">Event End Time</TableCell>
                                <TableCell width=""></TableCell>    {/* for event page button */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                            eventsList.map(element => (
                                <ListElements
                                    key = {element.event_name}
                                    // number = {numEvents}
                                    name = {element.event_name}
                                    // host = {1}
                                    // numParticipants = {1}
                                    startTime = {element.start_time._seconds}
                                    endTime = {element.end_time._seconds}
                                />
                            ))
                        }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
    else {
        return <div className='listofevents'></div>
    }

}

export default EventsList
