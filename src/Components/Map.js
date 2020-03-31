import React, { Component, useState } from 'react';
import '../StyleSheets/Map.css';
import ReactMapGL, { Marker, LinearInterpolator, FlyToInterpolator } from 'react-map-gl';
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
        focusID: "",
        interval: ""
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
            .orderBy('timestamp', 'desc')
            .limit(5)
            .onSnapshot(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const data = doc.data();
                    this.setState(prevState => {
                        let { pointsData, uids } = prevState;

                        //add or update mapping of uuid => { lat, long } to state
                        pointsData[data.user_uuid] = {
                            lat: data.latlng.latitude,
                            long: data.latlng.longitude,
                        };

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
        const longitude = data.long;
        const latitude = data.lat;
        const zoom = 18;

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
    }

    _onClick(id) {
        this.state.focusID = id;

        this.state.interval = setInterval(this._focus, 1000);
    }

    render() {
        const { viewport, pointsData, mapSettings, users, focusID } = this.state;
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
                            {
                                usersEntries.map(usersEntry => {
                                    const [userRef, userDetails] = usersEntry;
                                    
                                    return (
                                        <tr>
                                            <td>
                                                {userDetails.alias}
                                            </td>
                                            <td>
                                                <button className="follow-button" onClick={() => this._onClick(userRef)}>Follow</button>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>

                {entries.map(entry => {
                    // add markers on map with profile pictures
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
