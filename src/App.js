import React, {Component} from "react";
import {BrowserRouter, Route, Router} from "react-router-dom";
import CreateEvent from "./Components/CreateEvent";
import Map from "./Components/Map";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/CreateEvent" component={CreateEvent} />
        <Route path={"/events/:eventId"} component={Map} />
      </BrowserRouter>
    );
  }
}

export default App;
