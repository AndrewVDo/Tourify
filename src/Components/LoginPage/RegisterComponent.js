import React, {useState, useEffect} from 'react'

const RegisterComponent = (props) => {
    console.log(props.loginInfo)
    
    return (
        <div className='loginApp'>
            <h1 className='loginTitle'>Tourify</h1>
            <form className='loginForm' id='formId'>

                <picture>
                    <img 
                        src={props.loginInfo.additionalUserInfo.profile.picture}
                        alt='user profile'
                    ></img>
                </picture>
                <br></br>

                <label for='alias'>Alias:</label>
                <input 
                    type='text' 
                    id='alias' 
                    name='alias'
                    value={props.loginInfo.additionalUserInfo.profile.name}
                />
                <br></br>

                <label for='weight'>Weight</label>
                <input
                    type='text'
                    id='weight'
                    name='weight'
                />
                <br></br>

                <label for='nationality'>Nationality</label>
                <select 
                    id='nationality'
                    name='nationality'
                >
                    <option value='canada'>Canada</option>
                </select>
                <br></br>

                <label for='userType'>User type:</label>
                <select 
                    name='userType' 
                    id='userType'
                >
                    <option value='racer'>Racer</option>
                    <option value='admin'>Event Organizer</option>
                </select>
                <br></br>

                <input type='submit'></input>
                <br></br>

            </form>
        </div>
      )
}

export default RegisterComponent