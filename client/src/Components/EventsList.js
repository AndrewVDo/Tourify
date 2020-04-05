import React, {useEffect, useState} from "react"

import Button from '@material-ui/core/Button'
import {Table} from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import {Redirect} from 'react-router-dom'
import {getAllEvents, handleSignOut} from '../api'
import {auth} from '../firebase.js'

import '../StyleSheets/EventsList.css'


const EventsList = (prop) => {
    const [eventsList, setEventsList] = useState()
    const [shouldRedirectToCreateEvent, setRedirectToCreateEvent] = useState(false)
    const [shouldRedirectToProfile, setRedirectToProfile] = useState(false)
    const [shouldRedirectToEvents, setRedirectToEvents] = useState(false)
    const [eventPageLocation, setEventPageLocation] = useState()
    const [isAdmin, setIsAdmin] = useState(false)
    const [userID, setUserID] = useState("")

    function handleRedirectToCreateEvent() {
        setRedirectToCreateEvent(true);
    }

    function handleRedirectToProfile() {
        setRedirectToProfile(true);
    }

    function handleRedirectToEvents(eventID) {
        setRedirectToEvents(true);
        setEventPageLocation(eventID);
    }

    useEffect( () => {
        //async function nested inside because useEffect must be a callback
        async function blockingCall() {
            let response
            auth.onAuthStateChanged(async user => {
                if(!user){
                    prop.delCookie('profile')
                    return <Redirect to="/"/>
                }
                setUserID(user.uid);
                response = await getAllEvents(user.uid)
                setEventsList(response.events)
                setIsAdmin(response.userType === "Event Organizer")
            })
        }
        blockingCall()
    }, [])


    // function to show events in table
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
                    <Button className="event-pages" onClick={() => handleRedirectToEvents(prop.number)}>View Event</Button>
                </TableCell>
            </TableRow>
        )
    }


    if (!eventsList) {
        return <div className='list-of-events'></div>
    } else {
        if (shouldRedirectToCreateEvent) {
            return <Redirect to="/create-event"/>
        }

        if (shouldRedirectToProfile) {
            return <Redirect to={`/profile/${userID}`}/>
        }

        if (shouldRedirectToEvents) {
            return <Redirect to={`/events/${eventPageLocation}`}/>
        }

        return (
            <div className="list-of-events">

                <div className="btn-group">
                    <Button id="sign-out" onClick={() => handleSignOut(prop.delCookie)}>
                        Sign Out
                    </Button>
                    <Button id="view-profile-button" onClick={handleRedirectToProfile}>
                        View Your Profile
                    </Button>
                    {isAdmin? <Button id="create-event-button" onClick={handleRedirectToCreateEvent}>Create New Event</Button> : null}
                </div>

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
                                <TableCell width="">{/* for event page button */}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                                {
                                    eventsList.map(element => (
                                        <EventInfo
                                            key = {element.event_name}
                                            number = {element.event_id}
                                            name = {element.event_name}
                                            startTime = {new Date(element.start_time._seconds * 1000).toDateString()}
                                            endTime = {new Date(element.end_time._seconds * 1000).toDateString()}
                                        />
                                    ))
                                }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}

export default EventsList
