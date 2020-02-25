import React, {useState, useEffect} from 'react'
//import SignInWithGoogle from '../SignInWithGoogle'
import { signInWithGoogle } from "../firebase.js";
import GoogleButton from "react-google-button";

const LoginComponent = (props) => {
    useEffect(() => {
        document.getElementById('GoogleSignUpButton').getElementsByTagName('span')[0].innerHTML = 'Sign up with Google'

        document.getElementById('GoogleSignInButton')
            .addEventListener('click', async () => {
                console.log(await signInWithGoogle())
                //send user to events page
            })

        document.getElementById('GoogleSignUpButton')
            .addEventListener('click', () => {
                signInWithGoogle()
                    .then(loginInfo => {
                        props.setLoginInfo(loginInfo)
                        props.setRegisterPage(true)
                    })
                    .catch(err => console.log(err))
            })
    })

    return (
        <div className='loginApp'>
            <h1 className='loginTitle'>Tourify</h1>
            <form className='loginForm' id='formId'>
                <GoogleButton id='GoogleSignInButton'/>
                <GoogleButton id='GoogleSignUpButton'/>
            </form>
        </div>
    )
}

export default LoginComponent