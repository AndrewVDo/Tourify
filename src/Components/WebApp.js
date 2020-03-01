import React, {useState, useEffect,Component} from 'react'
import {BrowserRouter, Router, Route} from 'react-router-dom';
import LoginPage from './LoginPage/LoginPage';
import CreateEvent from './CreateEvent'

class App extends Component {
    render() {
        return(
            <BrowserRouter>
                <Route path="/" component={LoginPage} exact/>
                <Route path="/login" component={LoginPage} />
                <Route path="/CreateEvent" component={CreateEvent} /> 
            </BrowserRouter>
        ) 
    }
}

export default App;