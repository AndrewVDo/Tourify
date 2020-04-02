import React, { Component } from 'react';
import '../StyleSheets/Map.css';
import ReactMapGL, {
    Marker,
    FlyToInterpolator,
    Source,
    Layer,
} from 'react-map-gl';
import { firestore } from '../firebase';
import { getProfileInfo } from '../api';
import defaultProfilePicture from '../Images/cat.jpg';
import firebase from 'firebase';

const MAPBOX_TOKEN =
    'pk.eyJ1IjoiamFja3lqcyIsImEiOiJjazZjcjNndDAxZXo2M25wanVqNng1MDNsIn0.W3EnhJe_JOD0Cg9OBeTghA';

class Map extends Component {
    animation = null;

    state = {
        pointsData: {},
        viewport: {
            latitude: 47.605239,
            longitude: -122.201317,
            zoom: 9,
        },
        mapSettings: {
            width: '100vw',
            height: '100vh',
            mapStyle: 'mapbox://styles/mapbox/dark-v9',
            mapboxApiAccessToken: MAPBOX_TOKEN,
        },
        uids: new Set(), //set of uuids of users
        users: {}, //map of profiles
        focusID: '',
        interval: '',
    };

    async componentDidMount() {
        this._animatePoint();
        this.coordinatesRef = firestore.collection(
            `events/${this.props.match.params.eventId}/coordinates`
        );
        this.eventDoc = firestore.doc(
            `events/${this.props.match.params.eventId}`
        );
        this.coordinatesRef
            .where('timestamp', '>', new Date(Date.now()))
            .orderBy('timestamp', 'desc')
            .limit(1)
            .onSnapshot(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const data = doc.data();
                    this.setState(prevState => {
                        let { pointsData, uids } = prevState;

                        if (!pointsData[data.user_uuid]) {
                            pointsData[data.user_uuid] = [];
                        }

                        //add or update mapping of uuid => [ [lat, long], [lat, long], ... ] to state
                        pointsData[data.user_uuid].push({
                            lat: data.latlng.latitude,
                            long: data.latlng.longitude,
                        });

                        //add to the set of uuids for fetching user profile later
                        uids.add(data.user_uuid);

                        return { pointsData, uids };
                    });

                    this._animatePoint();
                });
            });
    }

    //called whenever state is updated
    componentDidUpdate(prevProps, prevState) {
        prevState.uids.forEach(async uid => {
            if (prevState.users[uid] !== undefined) {
                //user profile already exists
                return;
            }

            //fetch user profile and add it to state
            let profile = await getProfileInfo(uid);
            prevState.users[uid] = profile;
            this.setState({
                users: prevState.users,
            });

            //add user profile reference in on firestore
            this.eventDoc.update({
                participants: firebase.firestore.FieldValue.arrayUnion(
                    firestore.doc(`/users/user-${uid}`)
                ),
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

    _focus = () => {
        const data = this.state.pointsData[this.state.focusID];
        const longitude = data[data.length - 1].long;
        const latitude = data[data.length - 1].lat;
        const zoom = 17;

        this.setState({
            viewport: {
                ...this.state.viewport,
                longitude,
                latitude,
                zoom,
                transitionDuration: 1000,
                transitionInterpolator: new FlyToInterpolator(),
            },
        });
    };

    _onClick(id) {
        this.state.focusID = id;

        this.state.interval = setInterval(this._focus, 1000);
    }

    _formatGeoJson(entries) {
        let formattedFeatures = entries.map(entry => {
            let [uuid, coordinatePairs] = entry;

            let formattedCoordinates = coordinatePairs.map(coordinatePair => {
                return [coordinatePair.long, coordinatePair.lat];
            });

            return {
                type: 'Feature',
                geometry: {
                    type: 'LineString',
                    coordinates: formattedCoordinates,
                },
            };
        });

        let polylineGeoJSON = {
            type: 'FeatureCollection',
            properties: {},
            features: formattedFeatures,
        };

        return polylineGeoJSON;
    }

    render() {
        const { viewport, pointsData, mapSettings, users } = this.state;

        //convert JS object to array
        const entries = Object.entries(pointsData);
        const usersEntries = Object.entries(users);

        return (
            <ReactMapGL
                {...viewport}
                {...mapSettings}
                onViewportChange={this._onViewportChange}
            >
                <div className="list-of-racers">
                    <table>
                        <thead>
                            <tr>
                                <th colSpan="2">Active Racers</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersEntries.map(usersEntry => {
                                const [userRef, userDetails] = usersEntry;

                                return (
                                    <tr>
                                        <td>{userDetails.alias}</td>
                                        <td>
                                            <button
                                                className="follow-button"
                                                onClick={() =>
                                                    this._onClick(userRef)
                                                }
                                            >
                                                Follow
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <Source
                    id="route"
                    type="geojson"
                    data={this._formatGeoJson(entries)}
                >
                    <Layer
                        type="line"
                        layout={{
                            'line-join': 'round',
                            'line-cap': 'round',
                        }}
                        paint={{
                            'line-color': 'rgba(3, 170, 238, 0.5)',
                            'line-width': 5,
                        }}
                    />
                </Source>

                {entries.map(entry => {
                    // add markers on map with profile pictures
                    const [uuid, coordinatePairs] = entry;
                    const { lat, long } = coordinatePairs[
                        coordinatePairs.length - 1
                    ]; //get the last (latest) entry of coordinate pairs

                    let imgUrl =
                        this.state.users[uuid] === undefined
                            ? defaultProfilePicture
                            : this.state.users[uuid].profilePicUrl;

                    return (
                        <Marker
                            key={uuid}
                            latitude={lat}
                            longitude={long}
                            offsetLeft={-20}
                            offsetTop={-10}
                        >
                            <img
                                src={imgUrl}
                                alt="profile icon"
                                className={'marker'}
                            />
                        </Marker>
                    );
                })}
            </ReactMapGL>
        );
    }
}

export default Map;
