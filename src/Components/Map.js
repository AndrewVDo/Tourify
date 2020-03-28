import React, {Component} from 'react';
import '../StyleSheets/Map.css';
import ReactMapGL, {Marker, LinearInterpolator, FlyToInterpolator} from 'react-map-gl';
import {firestore} from '../firebase';
import {getProfileInfo} from '../api';
import defaultProfilePicture from '../Images/cat.jpg';

const MAPBOX_TOKEN =
    'pk.eyJ1IjoiamFja3lqcyIsImEiOiJjazZjcjNndDAxZXo2M25wanVqNng1MDNsIn0.W3EnhJe_JOD0Cg9OBeTghA';

class Map extends Component {
    animation = null;

    state = {
        pointsData: {},
        viewport: {
            latitude: 47.605239,
            longitude: -122.201317,
            zoom: 9
        },
        uids: new Set(),
        users: {},
    };

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        this._animatePoint();
        this.coordinatesRef = firestore.collection(
            `events/${this.props.match.params.eventId}/coordinates`
        );

        this.coordinatesRef
            .orderBy('timestamp', 'desc')
            .limit(5)
            .onSnapshot(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const data = doc.data();
                    this.setState(prevState => {
                        let { pointsData, uids } = prevState;

                        pointsData[data.user_uuid] = {
                            lat: data.latlng.latitude,
                            long: data.latlng.longitude,
                        };

                        uids.add(data.user_uuid);

                        return { pointsData, uids };
                    });

                    this._animatePoint();
                });
            });
    }

    componentDidUpdate(prevProps, prevState) {
        prevState.uids.forEach(async uid => {
            if (prevState.users[uid] !== undefined) {
                return;
            }

            let profile = await getProfileInfo(uid);
            prevState.users[uid] = profile;
            this.setState({
                users: prevState.users,
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

    _onClick = event => {
        // Sam pass in user id from the list of people
        // grab points data with user id that is passed in
        // set viewport to the lat and long of that person
        // test uid: aQIAX70LSDaYw5Tbnd6PjDEHjNH3
        // event: andrews event
        const test = "aQIAX70LSDaYw5Tbnd6PjDEHjNH3";
        const data = this.state.pointsData[test];
        const longitude = data.long;
        const latitude = data.lat;
        const zoom = 15;

        this.setState({
            viewport: {
                ...this.state.viewport,
                longitude,
                latitude,
                zoom,
                transitionDuration: 1000,
                transitionInterpolator: new FlyToInterpolator()
            }
        });

        console.log(data);
    }

    render() {
        const { viewport, pointsData } = this.state;
        const entries = Object.entries(pointsData);

        return (
            <ReactMapGL
                {...viewport}
                width="100vw"
                height="100vh"
                mapStyle="mapbox://styles/mapbox/dark-v9"
                onViewportChange={this._onViewportChange}
                mapboxApiAccessToken={MAPBOX_TOKEN}
                onClick = {this._onClick}
            >
                {entries.map(entry => {
                    const [key, val] = entry;
                    const { lat, long } = val;

                    let imgUrl =
                        this.state.users[key] === undefined
                            ? defaultProfilePicture
                            : this.state.users[key].profilePicUrl;

                    return (
                        <Marker
                            key={key}
                            latitude={lat}
                            longitude={long}
                            offsetLeft={-20}
                            offsetTop={-10}
                        >
                            <img src={imgUrl} className={'marker'} />
                        </Marker>
                    );
                })}
            </ReactMapGL>
        );
    }
}

export default Map;
