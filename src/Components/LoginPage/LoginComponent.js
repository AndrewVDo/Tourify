import React, {useState, useEffect} from 'react'
import GoogleButton from "react-google-button";
import { signInWithGoogle } from "../../firebase.js/index.js";
import {Redirect} from "react-router-dom";
import {clickLogin} from './utils.js'

const LoginComponent = (props) => {
    return (
        <div className='loginApp'>
            <h1 className='loginTitle'>Tourify</h1>
            <form className='loginForm' id='formId'>
                <GoogleButton
                    onClick={async () => {
                        try {
                            let loginInfo = await signInWithGoogle()
                            props.setLoginInfo(loginInfo)
                            let response = await clickLogin(loginInfo.credential.idToken)
                            if(response.error) {
                                alert(response.msg)
                            } 
                            else if (response.success) {
                                props.setRedirect(true)
                            }
                        }
                        catch(err) {
                            console.error('err: ', err)
                        }
                    }}
                />
                <GoogleButton
                    label='Register With Google'
                    onClick={async () => {
                        try {
                            let loginInfo = await signInWithGoogle()
                            props.setLoginInfo(loginInfo)
                            props.setIsRegisterPage(true)
                        }
                        catch(err) {
                            console.error('err: ', err.msg)
                        }
                    }}
                />
            </form>
        </div>
    )
}

export default LoginComponent