import React, {useState, useEffect} from "react"

function ListElements(prop) {
    return (
        <tr>
            <td>
                {prop.number}
            </td>
            <td>
                {prop.name}
            </td>
            <td>
                {prop.host}
            </td>
            <td>
                {prop.numParticipants}
            </td>
        </tr>
    )
}

function EventsList(prop) {
    //access inouts
    //prop.username
    console.log(prop.username)
    //const [password, setPassword] = useState('')

    var events = [];
    var event;
    var numEvent = 0;
    for (var i = 0; i < 10; i++) {
        event = new Object();
        event.number = i;
        event.name = "Ride " + i;
        event.host = "Sam";
        event.numParticipants = 0;

        events.push(event);
        numEvent++;
    }

    return (
        <div className="listofevents">
            <table border="1" id="listofevent">
                <tr>
                    <th colspan="4">Ongoing Events</th>
                </tr>
                <tr>
                    <th>Event #</th>
                    <th>Event Name</th>
                    <th>Host</th>
                    <th># Participants</th>
                </tr>
                {
                    events.map(element => (
                        <ListElements
                            number = {element.number}
                            name = {element.name}
                            host = {element.host}
                            numParticipants = {element.numParticipants}
                        />
                    ))
                }
            </table>
        </div>
    )
}

export default EventsList
