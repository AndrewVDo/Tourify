import React, {Component} from 'react'
import {BrowserRouter, Route} from 'react-router-dom';
import CreateEvent from './Components/CreateEvent';
import Map from "./Components/Map";
import LoginPage from './Components/LoginPage/LoginPage'

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <Route exact path="/CreateEvent" component={CreateEvent}/>
          <Route exact path={"/events/:eventId"} component={Map} />
          <Route exact path="/" component={LoginPage}/>
        </BrowserRouter>
    )
  }
}

export default App;
