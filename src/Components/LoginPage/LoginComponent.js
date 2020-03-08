import React, {useState, useEffect} from 'react'
import GoogleButton from "react-google-button";
import { signInWithGoogle } from "../firebase.js";
import {Redirect} from "react-router-dom";

const LoginComponent = (props) => {
    useEffect(() => {
        document.getElementById('GoogleSignUpButton').getElementsByTagName('span')[0].innerHTML = 'Register with Google'

        document.getElementById('GoogleSignInButton')
            .addEventListener('click', () => {
                signInWithGoogle()
                    .then(res => {
                        props.setRedirect(true)
                    })
                    .catch(err => {
                        //send incorrect login error
                    })
            })

        document.getElementById('GoogleSignUpButton')
            .addEventListener('click', () => {
                signInWithGoogle()
                    .then(loginInfo => {
                        props.setLoginInfo(loginInfo)
                        props.setRegisterPage(true)
                    })
                    .catch(err => {
                        //send incorrect register error
                    })
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