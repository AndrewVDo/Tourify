import React, {useState, useEffect} from 'react'
//import logo from './logo.svg'
import './LoginApp.css'

const LoginApp = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  const typeUsername = (event) => {
    console.log(1)
    setUsername(event.target.value)
  }

  const typePassword = (event) => {
    console.log(2)
    setPassword(event.target.value)
  }

  const handleSignIn = (event) => {
    console.log(3)
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
      resp.json().then(resp => {
        if(resp.result === 'failure') {
          setLoginError('Invalid Username/Password')
        }
      })
    })
    .catch(err => {
      console.log(err)
    })


  }

  const handleRegister = (event) => {
    console.log(4)

  }

  return (
    <div className='loginApp'>
      <header className='loginHeader'>
        <h1 className='loginTitle'>Tourify</h1>
        <form className='loginForm'>
          <input
            id='username'
            type='text'
            placeholder='Username'
            onChange={typeUsername}
          /><br/>
          <input
            id='password'
            type='password'
            placeholder='Password'
            onChange={typePassword}
          />
          <p>{loginError}</p>
          <button type='submit' onClick={handleSignIn}>Sign In</button><br/>
          <button type='button' onClick={handleRegister}>Register</button>
        </form>
      </header>
    </div>
  )
}

export default LoginApp
