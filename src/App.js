import React, {Component} from 'react'
import {BrowserRouter, Route, Router} from 'react-router-dom';
import CreateEvent from './Components/CreateEvent';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <Route path="/CreateEvent" component={CreateEvent}/>
        </BrowserRouter>
    )
  }
}

export default App;