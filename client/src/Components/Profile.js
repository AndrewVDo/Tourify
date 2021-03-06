import React, {useEffect, useState} from 'react';
import {Avatar, Button} from '@material-ui/core';
import ReactCountryFlag from 'react-country-flag';
import {getCode} from 'country-list';
import {Redirect} from 'react-router-dom';
import {getProfileInfo} from '../api';

import Accolades from "./Accolades";

import '../StyleSheets/Profile.css';

//TODO: enable/ disable edit button based on whether you are viewing your profile or another rider's profile
const Profile = props => {
    const [profile, setProfile] = useState({});
    const [toUpdate, setToUpdate] = useState(false);
    const [isAfterFetch, setIsAfterFetch] = useState(false);
    const [toEvents, setToEvents] = useState(false);

    useEffect(() => {
        try {
            blockFetch().then(data => {
                setProfile(data);
                setIsAfterFetch(true);
            });
            async function blockFetch() {
                let profileInfo = await getProfileInfo(
                    props.match.params.userId
                );
                return profileInfo;
            }
        } catch (err) {
            console.error('err: ', err);
        }
    }, []);
    if (toUpdate) {
        //intial : false
        return <Redirect to={`/profile/${props.match.params.userId}/edit`} />;
    }
    if (toEvents) {
        return <Redirect to={`/events`} />;
    }
    if (!isAfterFetch) {
        return <div id="profile"></div>;
    }
    return (
        <div id="profile-page">
            <div id ="profile">
                <div id="profile-header">
                    <table>
                        <tbody>
                        <tr>
                            <td className="profile-image">
                                <Avatar
                                    id="avatar"
                                    src={profile.profilePicUrl}
                                />
                            </td>
                            <td className="profile-image">
                                <ReactCountryFlag
                                    id="country-image"
                                    countryCode={getCode(profile.nationality)}
                                    svg
                                    cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                                    cdnSuffix="svg"
                                />
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <h1 id="name">{profile.alias}</h1>
                <div className="profile-body">
                    <p>Age: {(Number(profile.age) / 31536000000).toFixed(0)}</p>
                    <p>Weight: {profile.weight}</p>
                    <p id="nationality">Nationality: {profile.nationality}</p>
                    <p>user type: {profile.userType}</p>
                </div>
                <Button variant="contained" onClick={() => setToUpdate(true)}>
                    Edit
                </Button>
                <Button variant="contained" onClick={() => setToEvents(true)}>
                    Back
                </Button>
            </div>
            <div id ="accolades">
                <Accolades id="profile-awards"/>
            </div>
        </div>
    );
};

export default Profile;
