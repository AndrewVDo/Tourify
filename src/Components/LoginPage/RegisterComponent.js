import React, {useState, useEffect} from 'react'
import ReactCountryFlag from 'react-country-flag'
import {getNames, getCode} from 'country-list'
import {Input, InputLabel, Button, Select, MenuItem, TextField} from '@material-ui/core'

const nationalityList = getNames()
const userTypeList = ['Racer', 'Event Organizer']

const RegisterComponent = (props) => {
    console.log(props.loginInfo)
    //const [nationalityList, setNationalityList] = useState(getNames())
    //const [userTypeList, setUserTypeList] = useState(['Racer', 'Event Organizer'])

    const [alias, setAlias] = useState(props.loginInfo.additionalUserInfo.profile.name)
    const [weight, setWeight] = useState()
    const [birthday, setBirthday] = useState(new Date())
    const [nationality, setNationality] = useState(nationalityList[0])
    const [userType, setUserType] = useState(userTypeList[0])

    useEffect(() => {
        document.getElementById('nationality').addEventListener('change', event => {
            setNationality(event.target.value)
        })
    })
    
    return (
        <div className='loginApp'>
            <h1 className='loginTitle'>Tourify</h1>

            <table id='registration-table'>
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
                            countryCode={getCode(nationality)}
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
                            labelId='alias-label'
                            value={alias}
                            onChange={event => setAlias(event.target.value)}
                            InputLabelProps={{shrink: true}}
                        ></TextField>
                    </td>
                </tr>
                <tr>
                    <td>
                        <InputLabel id='weight-label'>Weight(KG)</InputLabel>
                    </td>
                    <td>
                        <TextField
                            id='weight'
                            labelId='weight-label'
                            onChange={event => setWeight(event.target.value)}
                            InputLabelProps={{shrink: true}}
                        ></TextField>
                    </td>
                </tr>
                <tr>
                    <td>
                        <InputLabel id='birthday-label'>Date of birth</InputLabel>
                    </td>
                    <td>
                        <TextField
                            id="birthday"
                            labelId='birthday-label'
                            type="date"
                            onChange={event => setBirthday(event.target.value)}
                            InputLabelProps={{shrink: true}}
                        ></TextField>
                    </td>
                </tr>
                <tr>
                    <td>
                        <InputLabel id='nationality-label'>Nationality</InputLabel>
                    </td>
                    <td>
                        <Select 
                            id='nationality'
                            labelId='nationality-label'
                            onChange={event => setNationality(event.target.value)}
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
                            labelId='userType-label'
                            onChange={event => setUserType(event.target.value)}
                        >
                            {userTypeList.map(elem => <MenuItem key={elem} value={elem}>{elem}</MenuItem>)}
                        </Select>
                    </td>
                </tr>
                <tr>
                    <td colSpan='2'>
                        <Button>
                            Register
                        </Button>
                    </td>
                </tr>
            </table>
        </div>
      )
}

export default RegisterComponent