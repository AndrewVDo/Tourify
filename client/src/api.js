import { signOut } from './firebase'

const BASE_URL = ``;

export const register = async (formData, dateOfBirth) => {
    try {
        let respString = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                alias: formData.alias,
                dateOfBirth: dateOfBirth,
                idToken: formData.idToken,
                nationality: formData.nationality,
                profilePicUrl: formData.profilePicUrl,
                uid: formData.uid,
                userType: formData['user-type'],
                weight: formData.weight,
            }),
        });

        return await respString.json();
    } catch (err) {
        console.error('err: ', err);
    }
};

export const login = async (idToken, uid) => {
    try {
        let respString = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                idToken: idToken,
                uid: uid
            }),
        });

        return await respString.json();
    } catch (err) {
        console.error('err: ', err);
    }
};

export const getAllEvents = async uid => {
    try {
        let respString = await fetch(`${BASE_URL}/events`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                uid: uid,
            }),
        });
        return await respString.json();
    } catch (err) {
        console.error(err);
    }
};

export async function getProfileInfo(userId) {
    try {
        let response = await fetch(`${BASE_URL}/profile-info/${userId}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
        });

        return (await response.json()).data;
    } catch (error) {
        console.log(error);
        return {
            success: false,
            error: error,
        };
    }
}

export async function updateProfile(uid, name, weight, age, nationality) {
    try {
        let response = fetch(`${BASE_URL}/update-profile-info`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uid: uid,
                name: name,
                weight: weight,
                age: age,
                nationality: nationality,
            }),
        });

        return await response.json();
    } catch (error) {
        console.log(error);
        return {
            success: false,
            error: error,
        };
    }
}


export const getUserEventParticipation = async uid => {
    let events = await getAllEvents();
    let eventList = events.events;
    let userParticipation = [];
    await eventList.forEach(event => {
        let eventName = event.event_name;
        let eventParticipants = event.participants;
        eventParticipants.forEach(participant => {
            let participantID = participant._path.segments[1];
            participantID = participantID.replace('user-', '');
            if (participantID === uid) {
                userParticipation.push({ event_name: eventName });
            }
        });
    });
    return userParticipation;
};

export async function handleSignOut(delCookie) {
    try{
        await signOut()
        delCookie('profile')
    } catch(e) {
        console.error(e)
    }
}

