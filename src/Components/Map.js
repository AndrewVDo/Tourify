import React, {Component} from "react";
import "../StyleSheets/Map.css";
import ReactMapGL, {Layer, Source} from "react-map-gl";
import {firestore} from "../firebase";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiamFja3lqcyIsImEiOiJjazZjcjNndDAxZXo2M25wanVqNng1MDNsIn0.W3EnhJe_JOD0Cg9OBeTghA";

const pointLayer = {
  type: "circle",
  paint: {
    "circle-radius": 5,
    "circle-color": "#007cbf"
  }
};

function point({ lat, long }) {
  return {
    type: "Point",
    coordinates: [long, lat]
  };
}

class Map extends Component {
  animation = null;

  state = {
    pointsData: {},
    viewport: {
      latitude: 49.155502,
      longitude: -123.000105,
      zoom: 5
    }
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this._animatePoint();
    this.coordinatesRef = firestore.collection(
      `events/${this.props.match.params.eventId}/coordinates`
    );

    this.coordinatesRef
      .orderBy("timestamp", "desc")
      .limit(1)
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = doc.data();
          this.setState(prev => {
            let pointsData = prev.pointsData;

            pointsData[data.user_uuid] = {
              lat: data.latlng.latitude,
              long: data.latlng.longitude
            };

            return { pointsData };
          });

          this._animatePoint();
        });
      });
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.animation);
  }

  _animatePoint = () => {
    this.animation = window.requestAnimationFrame(this._animatePoint);
  };

  _onViewportChange = viewport => this.setState({ viewport });

  render() {
    const { viewport, pointsData } = this.state;
    const entries = Object.entries(pointsData);

    return (
      <div className="map">
        <ReactMapGL
          {...viewport}
          width="100vw"
          height="100vh"
          mapStyle="mapbox://styles/mapbox/dark-v9"
          onViewportChange={this._onViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
        >
          <div className="list-of-racers">
            <table>
              <thead>
                <tr>
                  <th colSpan="2">Active Racers</th>
                </tr>
              </thead>
              <tbody>

              </tbody>
            </table>
          </div>

          {entries.map(entry => {
            const [key, val] = entry;
            const { lat, long } = val;
            const pointData = point({ lat: lat, long: long });

            return (
              pointData && (
                <Source key={key} type="geojson" data={pointData}>
                  <Layer {...pointLayer} />
                </Source>
              )
            );
          })}
        </ReactMapGL>
      </div>
    );
  }
}

export default Map;
