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
  }

  const clickRegister = (event) => {
    event.preventDefault()

    if(!checkPasswordMatch()) {
      setLoginError('Passwords do not match')
      return
    }
    if(!username || !email || !password || !confirmPassword) {
      setLoginError('Please fill in form completely')
      return
    }

    fetch('/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        confirmPassword: confirmPassword
      })
    })
    .then(resp => {
      if(!resp.status) {
        setLoginError(resp.message)
      } else {
        //register success
      }
    })
    .catch(err => console.log(err))
  }*/