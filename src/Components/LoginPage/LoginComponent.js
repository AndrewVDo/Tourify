import React, {useState, useEffect} from 'react'
import SignInWithGoogle from '../SignInWithGoogle'

const LoginComponent = (props) => {
    useEffect(() => {
        
    })

    return (
        <div className='loginApp'>
            <h1 className='loginTitle'>Tourify</h1>
            <form className='loginForm' id='formId'>
                <SignInWithGoogle />
                <button type='button'>Register</button>
            </form>
        </div>
    )
}

export default LoginComponent