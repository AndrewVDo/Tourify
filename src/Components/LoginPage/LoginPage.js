import React, {useState, useEffect} from 'react'
import '../../LoginApp.css'
import LoginComponent from './LoginComponent.js'
import RegisterComponent from './RegisterComponent.js'

const LoginPage = () => {
    const [displayRegister, setDisplayRegister] = useState(false)
    console.log('hello')

    if(displayRegister){
        console.log('register page');
        return(<RegisterComponent />)
    } else {
        console.log('login page')
        return(<LoginComponent />)
    }

}

export default LoginPage
