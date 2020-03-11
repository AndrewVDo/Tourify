import React, {useState, useEffect, Component} from "react"

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
import {populateEvents} from './LoginPage/utils'


import '../StyleSheets/EventsList.css'


function ListElements(prop) {
    return (
        <TableRow>
            <TableCell align="center"e>
                {prop.number}       {/* link that when clicked on, prompt user to join event */}
            </TableCell>
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

const EventsList = (prop) => {
    const [eventsList, setEventsList] = useState()

    // state for redirecting to create event page
    const [toCreateEvent, setToCreateEvent] = useState(false)
    function handleCreateEvent() {
        setToCreateEvent(true);
    }

    // state for redirecting to profile page
    const [toProfile, setToProfile] = useState(false)
    function handleProfile() {
        setToProfile(true);
    }

    // state for redirecting to events page
    const [toEvents, setToEvents] = useState(false)
    function handleEvents() {
        setToEvents(true);
    }

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
        button_createEvent = <Button id="createeventbutton" onClick={handleCreateEvent}>Create New Event</Button>
    }

    var button_viewProfile = <Button id="viewprofilebutton" onClick={handleProfile}>View Your Profile</Button>

    const buttons = (
        <div className="btn-group">
            {button_viewProfile}
            {button_createEvent}
        </div>
    )

    if (eventsList) {
        if (toCreateEvent) {
            return <Redirect to="/create-event"/>
        }

        if (toProfile) {
            return <Redirect to="/profile"/>
        }

        return (
            <div className="listofevents">
                {buttons}

                <TableContainer component={Paper}>
                    <Table border="1" id="listofevent">
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan="5" align="center">Ongoing Events</TableCell> {/* 7 in total */}
                            </TableRow>
                            <TableRow>
                                <TableCell width="" align="center">Event #</TableCell>
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
                                            number = {element.event_id}
                                            name = {element.event_name}
                                            // host = {1}
                                            // numParticipants = {1}
                                            startTime = {new Date(element.start_time._seconds).toDateString()}
                                            endTime = {new Date(element.end_time._seconds).toDateString()}
                                        />
                                    ))
                                }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    } else {
        return <div className='listofevents'></div>
    }

}

export default EventsList
