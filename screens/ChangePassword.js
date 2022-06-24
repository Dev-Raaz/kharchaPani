import {View, Text, ScrollView, TouchableOpacity, TextInput} from 'react-native'

//styles
import Containers from '../styles/containers'
import Typography from '../styles/typography'
import Buttons from '../styles/buttons'
import FormInputs from '../styles/forminputs'

import {FormErrorMessage, FormSuccessMessage} from '../components/validations/Validations'
import { AuthContext } from '../components/context'
import API_BASE from '../config/api'
import { useContext, useState } from 'react'
import axios from 'axios'



//Component
const ChangePassword = ({navigation}) => {
    const [oldPwd, setOldPwd] = useState(null)
    const [newPwd, setNewPwd] = useState(null)
    const [repeatNewPwd, setRepeatNewPwd] = useState(null)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(null)

    const [oldPwdError, setOldPwdError] = useState(null)
    const [newPwdError, setNewPwdError] = useState(null)
    const [repeatNewPwdError, setRepeatNewPwdError] = useState(null)

    const {getUserName} = useContext(AuthContext)

    //Funtion
    const handleSubmit = async() => {
        const username = getUserName()
        setLoading(true)
        const {data} = await axios.get(`${API_BASE}/users/${username}`)
        setLoading(false)

        if(!oldPwd || !newPwd || !repeatNewPwd){
            alert('All fields are needed to proceed !')
            return
        }

        //Checking if old passwords match
        if(data.password != oldPwd){
            setOldPwdError('Old Password do not match  !')
            setLoading(false)
            return
        }else{
            setOldPwdError(null)
        }

        //Checking if the password passes the check criteria
        if(newPwd.length < 8 || newPwd.length > 16 ){
            setNewPwdError('Password length should be between 8-16 characters')
            setLoading(false)
            return
        }else if(newPwd.search(/[0-9]/) == -1){
            setNewPwdError('Password should have atleast one number')
            setLoading(false)
            return
        }else if(newPwd.search(/[a-zA-Z]/) == -1){
            setNewPwdError('Password should have atleast one character')
            setLoading(false)
            return
        }else if(newPwd.search(/[!\@\#\%\$\^\&\*\(\)\_\+\.\,\;\:]/) == -1){
            setNewPwdError('Password should contain atleast one special character !')
            setLoading(false)
            return
        }else{
            setNewPwdError(null)
        }

        //Checking if the passwords match
        if(newPwd != repeatNewPwd){
            setRepeatNewPwdError('Passwords Should Match')
            setLoading(false)
            return
        }else{
            setRepeatNewPwdError(null)
        }

        //Requesting to change the password
        try{
            const updatedUser = await axios.patch(`${API_BASE}/users/${username}`,{
                password: newPwd
            }) 

            //Displaying success message
            if(updatedUser.data.username == username){
                setSuccess(`Change password to ${updatedUser.data.password} !`)
                setLoading(false)
            }
        }catch(err){
            console.log(`Error while changing password: ${err}`)
        }

    }


    //MAIN COMPONENT
    return (
        <View style={Containers.mainFull}>
            <View style={Containers.topM}>
                <Text style={Typography.p}>Fill in the following details to update your password !</Text>
            </View>

            <View style={Containers.topM}>
                <TextInput
                    placeholder='Old Password'
                    onChangeText={setOldPwd}
                    style={FormInputs.inputTxt}
                    secureTextEntry={true}
                />
            </View>
            {
                oldPwdError 
                ? <FormErrorMessage message={oldPwdError}/>
                : null
            }

            <TextInput
                placeholder='New Password'
                onChangeText={setNewPwd}
                style={FormInputs.inputTxt}
                secureTextEntry={true}
            />
            {
                newPwdError 
                ? <FormErrorMessage message={newPwdError}/>
                : null
            }

            <TextInput
                placeholder='Repeat New Password'
                onChangeText={setRepeatNewPwd}
                style={FormInputs.inputTxt}
                secureTextEntry={true}
            />
            {
                repeatNewPwdError 
                ? <FormErrorMessage message={repeatNewPwdError}/>
                : null
            }

            {
                success
                ? <FormSuccessMessage message={success}/>
                : null
            }

            <View style={Containers.topXl}>
                <TouchableOpacity style={Buttons.btnPrm}
                    onPress={handleSubmit}>
                    <Text style={Buttons.btnPrmTxt}>
                        {loading ? 'Loading . . .' : 'Change Password'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ChangePassword