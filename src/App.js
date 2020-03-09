import React, {Component} from 'react'
import {BrowserRouter, Route, Router} from 'react-router-dom';
import CreateEvent from './Components/CreateEvent';
import LoginPage from './Components/LoginPage/LoginPage'
import ProfilePage from './Components/profile'


class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <Route path="/CreateEvent" component={CreateEvent}/>
          <Route path="/ProfilePage"
          <Route path="/" component={LoginPage}/>
        </BrowserRouter>
    )
  }
}

export default App;
