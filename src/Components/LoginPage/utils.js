export const clickRegister =(alias,
                            dateOfBirth,
                            nationality,
                            profilePicUrl,
                            uid,
                            userType,
                            weight) => {  
    fetch(`/register`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body : {
            alias: alias,
            dateOfBirth: dateOfBirth,
            nationality: nationality,
            profilePicUrl: profilePicUrl,
            uid: uid,
            userType: userType,
            weight: weight
        }
    })
        .then(resp => resp.json())
        .then(response => {
            console.log('registered')
        })
}