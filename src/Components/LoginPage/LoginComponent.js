import React from 'react'
import GoogleButton from "react-google-button";
import {signInWithGoogle} from "../../firebase.js";
import {login} from '../../api.js'

const LoginComponent = (props) => {
    return (
        <div className='login-app'>
            <h1 className='title'>Tourify</h1>
            <form className='login-form' id='form-id'>
                <GoogleButton
                    onClick={async () => {
                        try {
                            let loginInfo = await signInWithGoogle()
                            props.setLoginInfo(loginInfo)
                            let response = await login(loginInfo.credential.idToken)
                            if(!response.success) {
                                alert(response.msg)
                                return
                            } 
                            props.setShouldRedirect(true)
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