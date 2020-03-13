import React, {Component} from 'react'
import {BrowserRouter, Route} from 'react-router-dom';
import CreateEvent from './Components/CreateEvent';
import LoginPage from './Components/LoginPage/LoginPage'
import EventsList from './Components/EventsList'
import Map from "./Components/Map";
import ProfilePage from './Components/Profile'
import UpdateProfile from "./Components/UpdateProfile";

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <Route exact path="/create-event" component={CreateEvent}/>
          <Route exact path="/events" component={EventsList}/>
          <Route exact path={"/events/:eventId"} component={Map} />
          <Route path="/profile/:userId" exact component={ProfilePage}/>
          <Route path="/profile/:userId/edit" component = {UpdateProfile}/>
          <Route path="/" exact component={LoginPage}/>
        </BrowserRouter>
    )
  }
}

export default App;
