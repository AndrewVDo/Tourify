import React, {useState, useEffect} from 'react'
import ReactCountryFlag from 'react-country-flag'
import {getNames, getCode} from 'country-list'
import {
    InputLabel, 
    Button,
    Select, 
    MenuItem, 
    TextField
} from '@material-ui/core'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers'
import {clickRegister} from './utils.js'

const nationalityList = getNames()
const userTypeList = ['Racer', 'Event Organizer']

const RegisterComponent = (props) => {
    const [formData, setFormData] = useState({
        alias: props.loginInfo.additionalUserInfo.profile.name,
        idToken: props.loginInfo.credential.idToken,
        nationality: nationalityList[0],
        profilePicUrl: props.loginInfo.additionalUserInfo.profile.picture,
        uid: props.loginInfo.user.uid,
        userType: userTypeList[0],
        weight: ''
    })
    const [dateOfBirth, setdateOfBirth] = useState(new Date())
    
    return (
        <div className='loginApp'>
            <h1 className='loginTitle'>Tourify</h1>

            <table id='registration-table'><tbody>
                <tr>
                    <td>
                        <img 
                            className='profileImage'
                            src={props.loginInfo.additionalUserInfo.profile.picture}
                            alt='user profile'
                        ></img>
                    </td>
                    <td>
                        <ReactCountryFlag
                            className='countryImage'
                            countryCode={getCode(formData.nationality)}
                            svg
                            style={{width:'100px', height:'100px', borderRadius:'100px'}}
                            cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                            cdnSuffix="svg"
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <InputLabel id='alias-label'>Alias</InputLabel>
                    </td>
                    <td>
                        <TextField 
                            id='alias'
                            defaultValue={formData.alias}
                            onChange={event => {
                                let newFormData = formData
                                newFormData.alias = event.target.value
                                setFormData(newFormData)
                            }}
                            InputLabelProps={{shrink: true}}
                        ></TextField>
                    </td>
                </tr>
                <tr>
                    <td>
                        <InputLabel id='weight-label'>Weight (KG)</InputLabel>
                    </td>
                    <td>
                        <TextField
                            id='weight'
                            onChange={event => {
                                let val = Number(event.target.value)
                                if(event.target.value !== '' && (isNaN(val) || val <= 0 || val >= 1000)){
                                    document.getElementById('weight').value = formData.weight
                                    return
                                }
                                let newFormData = formData
                                newFormData.weight = Number(event.target.value)
                                setFormData(newFormData)
                            }}
                            InputLabelProps={{shrink: true}}
                        ></TextField>
                    </td>
                </tr>
                <tr>
                    <td>
                        <InputLabel id='dateOfBirth-label'>Date of Birth</InputLabel>
                    </td>
                    <td>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                id="dateOfBirth"
                                value={dateOfBirth}
                                onChange={date => setdateOfBirth(date)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </td>
                </tr>
                <tr>
                    <td>
                        <InputLabel id='nationality-label'>Nationality</InputLabel>
                    </td>
                    <td>
                        <Select 
                            id='nationality'
                            defaultValue={nationalityList[0]}
                            onChange={event => {
                                let newFormData = formData
                                newFormData.nationality = event.target.value
                                setFormData(newFormData)
                            }}
                        >
                            {nationalityList.map(elem => <MenuItem key={elem} value={elem}>{elem}</MenuItem>)}
                        </Select>
                    </td>
                </tr>
                <tr>
                    <td>
                        <InputLabel id='userType-label'>User Type</InputLabel>
                    </td>
                    <td>
                        <Select 
                            id='userType'
                            defaultValue={userTypeList[0]}
                            onChange={event => {
                                let newFormData = formData
                                newFormData.userType = event.target.value
                                setFormData(newFormData)
                            }}
                        >
                            {userTypeList.map(elem => <MenuItem key={elem} value={elem}>{elem}</MenuItem>)}
                        </Select>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Button
                            onClick={async event => {
                                try {
                                    event.preventDefault()
                                    let result = await clickRegister(formData, dateOfBirth)
                                    if(result === 'success') {
                                        props.setRedirect(true)
                                    }
                                }
                                catch(err) {
                                    console.error('err: ', err)
                                }
                            }}
                        >
                            Register
                        </Button>
                    </td>
                    <td>
                        <Button onClick={event => {
                            event.preventDefault()
                            props.setRegisterPage(false)
                        }}>Cancel</Button>
                    </td>
                </tr>
            </tbody></table>
        </div>
      )
}

export default RegisterComponent