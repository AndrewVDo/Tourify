import React, {Component} from 'react'
import {BrowserRouter, Route, Router} from 'react-router-dom';
import CreateEvent from './Components/CreateEvent';
import LoginPage from './Components/LoginPage/LoginPage'
import ProfilePage from './Components/Profile'
import UpdateProfile from "./Components/updateProfile";

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <Route path="/CreateEvent" component={CreateEvent}/>
          <Route path="/Profile/:userId" component={ProfilePage}/>
          <Route path="/UpdateProfile" component = {UpdateProfile}/>
          <Route path="/" exact component={LoginPage}/>
        </BrowserRouter>
    )
  }
}

export default App;
