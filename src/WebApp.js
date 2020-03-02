import React, {useState, useEffect,Component} from 'react'
import {BrowserRouter, Router, Route} from 'react-router-dom';
import CreateEvent from './Components/CreateEvent';

class App extends Component {
    render() {
        return(
            <BrowserRouter>
                <Route path="/CreateEvent" component={CreateEvent} /> 
            </BrowserRouter>
        ) 
    }
}

export default App;