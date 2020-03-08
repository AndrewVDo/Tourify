import React, {useState, useEffect} from 'react'
import '../../StyleSheets/LoginApp.css'
import LoginComponent from './LoginComponent.js'
import RegisterComponent from './RegisterComponent.js'
import {Redirect} from 'react-router-dom'

const LoginPage = () => {
    const [registerPage, setRegisterPage] = useState(false)
    const [loginInfo, setLoginInfo] = useState({})
    const [redirect, setRedirect] = useState(false)

    if(redirect){
        return(<Redirect to='/CreateEvent'></Redirect>)
    }

    if(registerPage){
        return(
            <RegisterComponent 
                loginInfo = {loginInfo}
                setRedirect = {setRedirect}
            />
        )
    } else {
        return(
            <LoginComponent 
                setRegisterPage = {setRegisterPage}
                setLoginInfo = {setLoginInfo}
                setRedirect = {setRedirect}
            />
        )
    }

}

export default LoginPage
