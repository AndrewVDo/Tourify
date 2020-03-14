import React, {useState} from 'react'
import '../../StyleSheets/LoginApp.css'
import LoginComponent from './LoginComponent.js'
import RegisterComponent from './RegisterComponent.js'
import {Redirect} from 'react-router-dom'

const LoginPage = () => {
    const [isRegisterPage, setIsRegisterPage] = useState(false)
    const [loginInfo, setLoginInfo] = useState({})
    const [shouldRedirect, setShouldRedirect] = useState(false)

    if(shouldRedirect){
        return(<Redirect to='/events'></Redirect>)
    }

    return (isRegisterPage) ? 
    (
        <RegisterComponent 
            setIsRegisterPage = {setIsRegisterPage}
            loginInfo = {loginInfo}
            setShouldRedirect = {setShouldRedirect}
        />
    ) : (
        <LoginComponent 
            setIsRegisterPage = {setIsRegisterPage}
            setLoginInfo = {setLoginInfo}
            setShouldRedirect = {setShouldRedirect}
        />
    )
}

export default LoginPage
