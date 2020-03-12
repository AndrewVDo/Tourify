import React, {Component} from 'react'
import {BrowserRouter, Route, Router} from 'react-router-dom';
import CreateEvent from './Components/CreateEvent';
import LoginPage from './Components/LoginPage/LoginPage'
import EventsList from './Components/EventsList'
// import Profile from './Components/profile'
// import UpdateProfile from './Components/updateProfile'

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <Route path="/create-event" component={CreateEvent}/>
          <Route path="/events" component={EventsList}/>
          {/* <Route path="/profile" component={Profile}/>
          <Route path='/update-profile' component={UpdateProfile}/> */}
          <Route path="/" exact component={LoginPage}/>
        </BrowserRouter>
    )
  }
}

export default App;
