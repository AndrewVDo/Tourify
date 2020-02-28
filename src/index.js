import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LoginApp from './LoginApp';
import * as serviceWorker from './serviceWorker';
import Profile from "./Components/Profile";

//ReactDOM.render(<LoginApp />, document.getElementById('root'));
ReactDOM.render(<Profile/>, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
