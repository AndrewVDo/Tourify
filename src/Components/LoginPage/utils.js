export const clickRegister = async (formData, dateOfBirth) => {  
    let result, error
    await fetch(`/register`, {
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
        .then(resp => resp.json())
        .then(response => {
            console.log(response)
            if(response.error) {
                error = response.error
            } else {
                result = 'success'
            }
        })
    .catch(err => {
        error = err
    })

    return (result? result : error)
}