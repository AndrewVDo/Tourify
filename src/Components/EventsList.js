import React, {useState, useEffect} from "react"
import ReactDOM from 'react-dom'

import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import { styled } from '@material-ui/core/styles';
import { Table } from '@material-ui/core';

import { Redirect } from 'react-router-dom'
// import {firestore} from './firebase'
import {populateEvents} from './LoginPage/utils'

// import '../StyleSheets/EventList.css'


function ListElements(prop) {
    return (
        <tr>
            <td>
                {prop.number}       {/* link that when clicked on, prompt user to join event */}
            </td>
            <td>
                {prop.name}         {/* link that when clicked on, direct to event page */}
            </td>
            <td>
                {prop.host}         {/* link that when clicked on, direct to host's profile */}
            </td>
            <td>
                {prop.numParticipants}
            </td>
            <td>
                {prop.date}
            </td>
            <td>
                <Button className="eventpages">View Event</Button>      {/* need to make GET request along with event # or any identifier */}
            </td>
        </tr>
    )
}

//async function EventsList(prop) {
const EventsList = (prop) => {
    const [eventsList, setEventsList] = useState()

    useEffect( () => {
        //async function nested inside because useEffect must be a callback
        async function blockingCall(){
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
                <Table border="1" id="listofevent">
                    <thead>
                        <tr>
                            <th colSpan="6">Ongoing Events</th>
                        </tr>
                        <tr>
                            <th width="">Event #</th>
                            <th width="">Event Name</th>
                            <th width="">Host</th>
                            <th width=""># Participants</th>
                            <th width="">Event Date</th>
                            <th width=""></th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        eventsList.map(element => (
                            <ListElements
                                key = {element.event_name}
                                number = {1}
                                name = {element.event_name}
                                host = {1}
                                numParticipants = {1}
                                date = {1}
                            />
                        ))
                    }
                    </tbody>
                </Table>
            </div>
        );
    }
    else {
        return <div className='listofevents'></div>
    }

}

export default EventsList
