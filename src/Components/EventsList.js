import React, {useState, useEffect} from "react"
import ReactDOM from 'react-dom'

import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import { styled } from '@material-ui/core/styles';
import { Table } from '@material-ui/core';

import { Redirect } from 'react-router-dom'
import {firestore} from './firebase'

import '../StyleSheets/EventList.css'


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
const EventsList = async (prop) => {
    var userData = await firestore.collection("users").doc();
    var eventData = await firestore.collection("events");


    var events = [];
    var event;
    var numEvent = 0;
    for (var i = 0; i < 10; i++) {
        event = new Object();
        event.number = i;
        event.name = "Ride " + i;
        event.host = "Sam";
        event.numParticipants = 0;
        event.date = "Mar " + i;

        events.push(event);
        numEvent++;
    }

    var button_createEvent = null;
    var isAdmin = true;
    // if (userData.get(userType) == "Event Organizer") {
    if (isAdmin) {
        button_createEvent = <Button id="createeventbutton" color="red">Create New Event</Button>
    }

    var button_viewProfile = <Button id="viewprofilebutton" color="blue">View Your Profile</Button>

    const buttons = (
        <div class="btn-group">
            {button_viewProfile}
            {button_createEvent}
        </div>
    )

    const table = (
        <div className="listofevents">
            {/* <React.Fragment> */}
                {buttons}
            {/* </React.Fragment> */}
            <Table border="1" id="listofevent">
                <tr>
                    <th colspan="6">Ongoing Events</th>
                </tr>
                <tr>
                    <th width="">Event #</th>
                    <th width="">Event Name</th>
                    <th width="">Host</th>
                    <th width=""># Participants</th>
                    <th width="">Event Date</th>
                    <th width=""></th>
                </tr>
                {
                    events.map(element => (
                        <ListElements
                            number = {element.number}
                            name = {element.name}
                            host = {element.host}
                            numParticipants = {element.numParticipants}
                            date = {element.date}
                        />
                    ))
                }
            </Table>
        </div>
    );

    return (
        table
    )
}

export default EventsList
