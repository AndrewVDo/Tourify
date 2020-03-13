import React, {Component} from 'react'
import {BrowserRouter, Route} from 'react-router-dom';
import CreateEvent from './Components/CreateEvent';
import Map from "./Components/Map";
import LoginPage from './Components/LoginPage/LoginPage'
import ProfilePage from './Components/Profile'
import UpdateProfile from "./Components/UpdateProfile";

class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={LoginPage}/>
            <Route path="/profile/:userId" exact component={ProfilePage}/>
            <Route path="/profile/:userId/edit" component = {UpdateProfile}/>
            <Route path="/events/create" exact component={CreateEvent}/>
            <Route path="/events/:eventId" component={Map} />
        </BrowserRouter>
    )
  }
}

export default App;
