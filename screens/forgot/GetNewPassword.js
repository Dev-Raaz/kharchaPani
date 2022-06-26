import {View, Text, TouchableOpacity, TextInput} from 'react-native'

//styles
import Containers from '../../styles/containers'
import Typography from '../../styles/typography'
import Buttons from '../../styles/buttons'
import OnboardingStyles from '../../styles/screens/onboarding'
import SignInStyles from '../../styles/screens/signin'
import FormInputs from '../../styles/forminputs'

import { AuthContext } from '../../components/context'
import { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE from '../../config/api';

import {FormErrorMessage, FormSuccessMessage} from '../../components/validations/Validations'


const GetNewPassword = ({route, navigation}) => {
    
    const [username, setUername] = useState(null)
    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState(null)
    const [reEnterPassword, setReEnterPassword] = useState(null)

    const [pwdErr, setNewPwdError] = useState(null)
    const [reEnterPwdErr, setRepeatNewPwdError] = useState(null)

    //Update Password
    const UpdatePassword = async()=>{
        setLoading(true)
        
        const {email} = route.params

        if(!password || !reEnterPassword){
            alert('All fields are required')
        }

        if(password.length < 8 || password.length > 16 ){
            setNewPwdError('Password length should be between 8-16 characters')
            setLoading(false)
            return
        }else if(password.search(/[0-9]/) == -1){
            setNewPwdError('Password should have atleast one number')
            setLoading(false)
            return
        }else if(password.search(/[a-zA-Z]/) == -1){
            setNewPwdError('Password should have atleast one character')
            setLoading(false)
            return
        }else if(password.search(/[!\@\#\%\$\^\&\*\(\)\_\+\.\,\;\:]/) == -1){
            setNewPwdError('Password should contain atleast one special character !')
            setLoading(false)
            return
        }else{
            setNewPwdError(null)
        }

        //Checking if the passwords match
        if(password != reEnterPassword){
            setRepeatNewPwdError('Passwords Should Match')
            setLoading(false)
            return
        }else{
            setRepeatNewPwdError(null)
            setLoading(false)
            navigation.navigate('SignIn')
        }

        try{
            const {data} = await axios.patch(`${API_BASE}/users/email/${email}`,{
                password: password
            })

            console.log(data)

            if(data.username == username){
                setLoading(false)
            }

        }catch(err){
            console.log(`Error while recovering password: ${err}`)
        }
    }

    return (
        <View style={Containers.mainFull}>
            <View style={{marginTop: 40}}>
                <Text style={Typography.h3}>Get New Password</Text>
            </View>
            <View style={Containers.topM}>
                <Text style={Typography.p}>Enter the correct details to get your password</Text>
            </View>

            <TextInput
                    placeholder='Enter Password'
                    onChangeText={setPassword}
                    secureTextEntry={true}
                    style={FormInputs.inputTxt}
                />
            {
                pwdErr
                ? <FormErrorMessage message={pwdErr}/>
                : null
            }
            <TextInput
                    placeholder='Re-Enter Password'
                    onChangeText={setReEnterPassword}
                    secureTextEntry={true}
                    style={FormInputs.inputTxt}
            />
            {
                reEnterPwdErr
                ? <FormErrorMessage message={reEnterPwdErr}/>
                : null
            }

            <View style={Containers.topL}>
            <TouchableOpacity style={Buttons.btnPrm} onPress={UpdatePassword}>
                    <Text style={Buttons.btnPrmTxt}>
                        {
                            loading ? 'Loading . . .' : 'Update Password'                    
                        }
                    </Text>
            </TouchableOpacity>
            </View>
        </View>
    )
}


export default GetNewPassword