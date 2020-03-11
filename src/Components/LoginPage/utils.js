export const clickRegister = async (formData, dateOfBirth) => {  
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
                userType: formData.userType,
                weight: formData.weight
            })
        })

        return await respString.json()
    }
    catch(err) {
        console.error('err: ', err)
    }
}

export const clickLogin = async idToken => {
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

export const getUserInfo = async () => {
    try {
        let respString = await fetch('/userInfo', {
            method: "GET",
            headers: {
                'Accecpt': 'application/json',
                'Content-type': 'application/json'
            }
        })
        return (await respString.json()).users;
    }
    catch(err) {
        console.log(err)
    }
}

export const populateEvents = async () => {
    try {
        let respString = await fetch('/eventsList', {
            method: "GET",
            headers: {
                'Accecpt': 'application/json',
                'Content-type': 'application/json'
            }
        })
        return (await respString.json()).events;
    }
    catch(err) {
        console.log(err)
    }
}
