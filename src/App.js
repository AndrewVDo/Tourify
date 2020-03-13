import React, {Component} from 'react'
import {BrowserRouter, Route} from 'react-router-dom';
import CreateEvent from './Components/CreateEvent';
import LoginPage from './Components/LoginPage/LoginPage'
import EventsList from './Components/EventsList'
import Map from "./Components/Map";

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <Route path="/create-event" component={CreateEvent}/>
          <Route path="/events" component={EventsList}/>
          <Route exact path={"/events/:eventId"} component={Map} />
          <Route exact path="/" component={LoginPage}/>
        </BrowserRouter>
    )
  }
}

export default App;
