/*const clickLogin = (event) => {
event.preventDefault()  

fetch('/login', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: username,
    password: password
  })
})
.then(resp => {
  console.log(resp)
  resp.json().then(resp => {
    console.log(resp)
    if(!resp.status) {
      setLoginError(resp.message)
    } else {
      //login success
    }
  })
})
.catch(err => console.log(err))
}*/

export const clickRegister =    (uid,
                                alias,
                                weight,
                                birthday,
                                nationality,
                                userType) => {  
    console.log(uid)
}