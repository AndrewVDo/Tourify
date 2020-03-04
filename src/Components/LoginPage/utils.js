export const clickRegister =(alias,
                            dateOfBirth,
                            idToken,
                            nationality,
                            profilePicUrl,
                            uid,
                            userType,
                            weight) => {  
    console.log('hi')
    fetch(`/register`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({
            alias: alias,
            dateOfBirth: dateOfBirth,
            idToken: idToken,
            nationality: nationality,
            profilePicUrl: profilePicUrl,
            uid: uid,
            userType: userType,
            weight: weight
        })
    })
        .then(resp => resp.json())
        .then(response => {
            console.log('registered')
        })
}