import React from 'react';
import ReactDOM from 'react-dom';
import './StyleSheets/index.css';
import App from './App.js';
import * as serviceWorker from './serviceWorker';
import Profile from "./Components/Profile";
import UpdateProfile from "./Components/updateProfile";

ReactDOM.render(<App/>, document.getElementById('root'));
//ReactDOM.render(<UpdateProfile/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
