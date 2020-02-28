import React from 'react';
import ReactDOM from 'react-dom';
import './StyleSheets/index.css';
import LoginPage from './Components/LoginPage/LoginPage.js';
import * as serviceWorker from './serviceWorker';
import CreateEvent from "./Compenents/CreateEvent.js";

ReactDOM.render(<CreateEvent />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
