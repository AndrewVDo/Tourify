import React, {useState} from 'react'
import '../../StyleSheets/LoginApp.css'
import LoginComponent from './LoginComponent.js'
import RegisterComponent from './RegisterComponent.js'
import {Redirect} from 'react-router-dom'

const LoginPage = () => {
    const [isRegisterPage, setIsRegisterPage] = useState(false)
    const [loginInfo, setLoginInfo] = useState({})
    const [redirect, setRedirect] = useState(false)

    if(redirect){
        return(<Redirect to='/CreateEvent'></Redirect>)
    }

    return (isRegisterPage) ? 
    (
        <RegisterComponent 
            setRegisterPage = {setIsRegisterPage}
            loginInfo = {loginInfo}
            setRedirect = {setRedirect}
        />
    ) : (
        <LoginComponent 
            setIsRegisterPage = {setIsRegisterPage}
            setLoginInfo = {setLoginInfo}
            setRedirect = {setRedirect}
        />
    )
}

export default LoginPage
