import React, {Component} from 'react'
import {BrowserRouter, Route} from 'react-router-dom';
import CreateEvent from './Components/CreateEvent';
import LoginPage from './Components/LoginPage/LoginPage'

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <Route path="/CreateEvent" component={CreateEvent}/>
          <Route path="/" component={LoginPage}/>
        </BrowserRouter>
    )
  }
}

export default App;