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
import {getUserInfo} from './LoginPage/utils'

import '../StyleSheets/EventsList.css'


function foo(num) {
    console.log(num)
}

function EventInfo(prop) {
    return (
        <TableRow>
            <TableCell align="center">
                {prop.number}
            </TableCell>
            <TableCell align="center">
                {prop.name}
            </TableCell>
            <TableCell align="center">
                {prop.startTime}
            </TableCell>
            <TableCell align="center">
                {prop.endTime}
            </TableCell>
            <TableCell align="center">
                <Button className="event-pages" onClick={foo(prop.number)}>View Event</Button>      {/* need to make GET request along with event # or any identifier */}
            </TableCell>
        </TableRow>
    )
}

const EventsList = (prop) => {
    const [eventsList, setEventsList] = useState()

    // state for redirecting to create event page
    const [shouldRedirectToCreateEvent, setRedirectToCreateEvent] = useState(false)
    function handleCreateEvent() {
        setRedirectToCreateEvent(true);
    }

    // state for redirecting to profile page
    const [shouldRedirectToProfile, setRedirectToProfile] = useState(false)
    function handleProfile() {
        setRedirectToProfile(true);
    }

    // state for redirecting to events page
    const [shouldRedirectToEvents, setRedirectToEvents] = useState(false)
    function handleEvents() {
        setRedirectToEvents(true);
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
        button_createEvent = <Button id="create-event-button" onClick={handleCreateEvent}>Create New Event</Button>
    }

    var button_viewProfile = <Button id="view-profile-button" onClick={handleProfile}>View Your Profile</Button>

    const buttons = (
        <div className="btn-group">
            {button_viewProfile}
            {button_createEvent}
        </div>
    )

    if (eventsList) {
        if (shouldRedirectToCreateEvent) {
            return <Redirect to="/create-event"/>
        }

        if (shouldRedirectToProfile) {
            return <Redirect to="/profile"/>
        }

        if (shouldRedirectToEvents) {
            // var path = "/events" + 
            return <Redirect to="/events/"/>
        }

        return (
            <div className="list-of-events">
                {buttons}

                <TableContainer component={Paper}>
                    <Table border="1" id="list-of-event">
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan="5" align="center">Ongoing Events</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell width="" align="center">Event #</TableCell>
                                <TableCell width="" align="center">Event Name</TableCell>
                                <TableCell width="" align="center">Event Start Time</TableCell>
                                <TableCell width="" align="center">Event End Time</TableCell>
                                <TableCell width=""></TableCell>    {/* for event page button */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                                {
                                    eventsList.map(element => (
                                        <EventInfo
                                            key = {element.event_name}
                                            number = {element.event_id}
                                            name = {element.event_name}
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
        return <div className='list-of-events'></div>
    }

}

export default EventsList
