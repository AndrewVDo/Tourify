import React, {useState, useEffect} from 'react'
import GoogleButton from "react-google-button";
import { signInWithGoogle } from "../firebase.js";
import {Redirect} from "react-router-dom";
import {clickLogin} from './utils.js'

const LoginComponent = (props) => {
    useEffect(() => {
        document.getElementById('GoogleSignUpButton').getElementsByTagName('span')[0].innerHTML = 'Register with Google'

        document.getElementById('GoogleSignInButton')
            .addEventListener('click', async () => {
                try {
                    let loginInfo = await signInWithGoogle()
                    props.setLoginInfo(loginInfo)
                    let verify = await clickLogin(loginInfo.credential.idToken)
                    console.log('verify: ', verify)
                }
                catch(err) {
                    console.error('err: ', err)
                }
            })

        document.getElementById('GoogleSignUpButton')
            .addEventListener('click', async () => {
                try {
                    let loginInfo = await signInWithGoogle()
                    props.setLoginInfo(loginInfo)
                    props.setRegisterPage(true)
                }
                catch(err) {
                    console.error('err: ', err)
                }
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