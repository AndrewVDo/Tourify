import React from "react";
import "../StyleSheets/Map.css";
import ReactMapGL from "react-map-gl";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiamFja3lqcyIsImEiOiJjazZjcjNndDAxZXo2M25wanVqNng1MDNsIn0.W3EnhJe_JOD0Cg9OBeTghA";

class Map extends React.Component {
  state = {
    viewport: {
      latitude: 37.785164,
      longitude: -100,
      zoom: 3.5,
      bearing: 0,
      pitch: 0
    }
  };

  _updateViewport = viewport => {
    this.setState({ viewport });
  };

  render() {
    return (
      <ReactMapGL
        width="100vw"
        height="100vh"
        {...this.state.viewport}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        onViewportChange={this._updateViewport}
      />
    );
  }
}

export default Map;
