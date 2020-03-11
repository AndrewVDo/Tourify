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
          <Route path="/CreateEvent" component={CreateEvent}/>
          <Route path="/EventsList" component={EventsList}/>
          {/* <Route path="/Profile" component={Profile}/>
          <Route path='UpdateProfile' component={UpdateProfile}/> */}
          <Route path="/" exact component={LoginPage}/>
        </BrowserRouter>
    )
  }
}

export default App;