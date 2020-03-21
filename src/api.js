export const register = async (formData, dateOfBirth) => {
    try {
        let respString = await fetch(`/register`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                alias: formData.alias,
                dateOfBirth: dateOfBirth,
                idToken: formData.idToken,
                nationality: formData.nationality,
                profilePicUrl: formData.profilePicUrl,
                uid: formData.uid,
                userType: formData['user-type'],
                weight: formData.weight
            })
        })

        return await respString.json()
    }
    catch(err) {
        console.error('err: ', err)
    }
}

export const login = async idToken => {
    try {
        let respString = await fetch('/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                idToken: idToken
            })
        })

        return await respString.json()
    }
    catch(err) {
        console.error('err: ', err)
    }
}

export const getAllEvents = async (uid) => {
    try {
        let respString = await fetch('/events', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                uid: uid
            })
        })
        return (await respString.json());
    }
    catch(err) {
        console.error(err)
    }
}

export async function getProfileInfo() {
    try {
        let response = await fetch('/profile-info', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                uid: props.match.params.userId
            })
        });

        return await response.json();
    } catch (error) {
        console.log(error);
        return {
            success: false,
            error: error
        }
    }

}