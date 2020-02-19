import React, {useState, useEffect} from 'react'
//import logo from './logo.svg'
import './LoginApp.css'

const LoginApp = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  //activePage
  //  0: login page
  //  1: register page
  const [activePage, setActivePage] = useState(0)

  const typeUsername = event => setUsername(event.target.value)
  const typeEmail = event => setEmail(event.target.value)
  const typePassword = event => setPassword(event.target.value)
  const typeconfirmPassword = event => setConfirmPassword(event.target.value)
  const checkPasswordMatch = event => password === confirmPassword

  const clickLogin = (event) => {
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
  }


  const switchPage = (event) => {
    document.getElementById('formId').reset()
    setActivePage(activePage ? 0: 1)
  }

  if(activePage === 0) {
    return (
      <div className='loginApp'>
        <div className='loginHeader'>
          <h1 className='loginTitle'>Tourify</h1>
          <form className='loginForm' id='formId'>
            <input id='username' type='text' placeholder='Username' onChange={typeUsername}/><br/>
            <input id='password' type='password' placeholder='Password' onChange={typePassword}/>
            <p>{loginError}</p>
            <button type='submit' onClick={clickLogin}>Sign In</button><br/>
            <button type='button' onClick={switchPage}>Register</button>
          </form>
        </div>
      </div>
    )  
  } else if(activePage === 1) {
    return (
      <div className='loginApp'>
        <div className='loginHeader'>
          <h1 className='loginTitle'>Tourify</h1>
          <form className='loginForm' id='formId'>
            <input id='username' type='text' placeholder='Username' onChange={typeUsername}/><br/>
            <input id='email' type='email' placeholder='Email Address' onChange={typeEmail}/><br/>
            <input id='password' type='password' placeholder='Password' onChange={typePassword}/><br/>
            <input id='confirmPassword' type='password' placeholder='Confirm Password' onChange={typeconfirmPassword}/><br/>
            <p>{loginError}</p>
            <button type='button' onClick={clickRegister}>Register</button><br/>
            <button type='submit' onClick={switchPage}>Cancel</button>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginApp
