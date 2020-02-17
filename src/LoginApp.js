import React, {useState, useEffect} from 'react'
//import logo from './logo.svg'
import './LoginApp.css'

const LoginApp = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  //activePage
  //  0: login page
  //  1: register page
  const [activePage, setActivePage] = useState(0)

  const typeUsername = event => setUsername(event.target.value)
  const typePassword = event => setPassword(event.target.value)

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
      resp.json().then(resp => {
        if(!resp.result) {
          setLoginError(resp.result.error)
        } else {
          //login success
        }
      })
    })
    .catch(err => console.log(err))
  }

  const switchRegister = (event) => {
    setActivePage(1)
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
          <button type='submit' onClick={clickLogin}>Sign In</button><br/>
          <button type='button' onClick={switchRegister}>Register</button>
        </form>
      </header>
    </div>
  )
}

export default LoginApp
