import React from 'react';
import ReactDOM from 'react-dom';
import './StyleSheets/index.css';
import LoginPage from './Components/LoginPage/LoginPage.js';
import * as serviceWorker from './serviceWorker';
import Profile from "./Components/profile";

ReactDOM.render(<Profile uid={"user-WG4iABL5TFQU7XeFiL80ZjaJM1p1"}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
