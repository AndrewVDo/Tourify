import React, {useState, useEffect} from 'react'
import '../../StyleSheets/LoginApp.css'
import LoginComponent from './LoginComponent.js'
import RegisterComponent from './RegisterComponent.js'

const LoginPage = () => {
    const [registerPage, setRegisterPage] = useState(false)
    const [loginInfo, setLoginInfo] = useState({})

    if(registerPage){
        return(
            <RegisterComponent 
                loginInfo = {loginInfo}
            />
        )
    } else {
        return(
            <LoginComponent 
                setRegisterPage = {setRegisterPage}
                setLoginInfo = {setLoginInfo}
            />
        )
    }

}

export default LoginPage
