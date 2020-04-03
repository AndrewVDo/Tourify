import React, {Component} from "react";
import "../StyleSheets/CreateEvent.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {Redirect} from "react-router-dom";
import firebase, {firestore} from "../firebase";

class CreateEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      eventName: "",
      startDate: "2020-05-24T10:30",
      endDate: "2020-05-24T17:30"
    };
  }

  handleInputChange = event => {
    const {target} = event;
    const {name, value} = target;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    const {eventName, startDate, endDate} = this.state;
    const eventsRef = firestore.collection("events").doc();

    eventsRef.set({
      event_name: eventName,
      start_time: firebase.firestore.Timestamp.fromDate(new Date(startDate)),
      end_time: firebase.firestore.Timestamp.fromDate(new Date(endDate))
    });

    this.setState({
      redirect: true
    });

    event.preventDefault();
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/events"/>;
    }

    const spacing = {
      marginBottom: "30px",
      display: "flex"
    };

    return (
        <div className="CreateEvent">
          <h1 className="title">Create Your Event</h1>
          <form id="event" onSubmit={this.handleSubmit} noValidate>
            <TextField
                id="event_name"
                name="eventName"
                style={spacing}
                label="Event Name"
                variant="filled"
                onChange={this.handleInputChange}
            />

            <TextField
                id="start-date"
                name="startDate"
                label="Start Date"
                type="datetime-local"
                defaultValue={this.state.startDate}
                InputLabelProps={{
                  shrink: true
                }}
                style={spacing}
                variant="filled"
                onChange={this.handleInputChange}
            />

            <TextField
                id="end-date"
                name="endDate"
                label="End Date"
                type="datetime-local"
                defaultValue={this.state.endDate}
                InputLabelProps={{
                  shrink: true
                }}
                style={spacing}
                variant="filled"
                onChange={this.handleInputChange}
            />

            <Button type="submit" variant="contained" color="primary">
              Create Event
            </Button>
          </form>
        </div>
    );
  }
}

export default CreateEvent;
