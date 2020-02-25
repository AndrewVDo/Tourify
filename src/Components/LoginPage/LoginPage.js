import React, {useState, useEffect} from 'react'
import '../../StyleSheets/LoginApp.css'
import LoginComponent from './LoginComponent.js'
import RegisterComponent from './RegisterComponent.js'

const LoginPage = () => {
    const [registerPage, setRegisterPage] = useState(false)
    const [loginInfo, setLoginInfo] = useState({})
    console.log('hello')

    if(registerPage){
        console.log('register page');
        return(
            <RegisterComponent 
                loginInfo = {loginInfo}
            />
        )
    } else {
        console.log('login page')
        return(
            <LoginComponent 
                setRegisterPage = {setRegisterPage}
                setLoginInfo = {setLoginInfo}
            />
        )
    }

}

export default LoginPage
