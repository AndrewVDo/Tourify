export const clickRegister = async (formData, dateOfBirth) => {  
    try {
        let respString = await fetch(`https://tourify-backend.herokuapp.com/register`, {
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
        let respString = await fetch('https://tourify-backend.herokuapp.com/login', {
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