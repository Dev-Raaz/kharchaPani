import {View, Text, ScrollView, TouchableOpacity, TextInput} from 'react-native'
import { useContext, useState } from 'react'
import axios from 'axios'

import LogoIcon from '../../assets/branding/logo'
import {FormErrorMessage, FormSuccessMessage} from '../../components/validations/Validations'
import { AuthContext } from '../../components/context'


//styles
import Containers from '../../styles/containers'
import Typography from '../../styles/typography'
import Buttons from '../../styles/buttons'
import OnboardingStyles from '../../styles/screens/onboarding'
import SignInStyles from '../../styles/screens/signin'
import FormInputs from '../../styles/forminputs'
import API_BASE from '../../config/api'


export default SignUp = ({navigation}) => {

    //Values For Inputs
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [reEnterPassword, setReEnterPassword] = useState('')
    const [loading, setLoading] = useState(false)

    
    const [emailError, setEmailError] = useState(null)
    const [usernameError, setUsernameError] = useState(null)
    const [passwordError, setPasswordError] = useState(null)
    const [reEnterPasswordError, setReEnterPasswordError] = useState(null)
    

    //Getting the context
    const {signUp} = useContext(AuthContext)

    //Handle Submit
    const handleSubmit = async () => {
        //Loading
        setLoading(true)

        if(!name || !email || !username || !password || !reEnterPassword){
            console.log('Can not pass validation 1')
            setLoading(false)
            alert('All Fields Are Required !')
            return
        }

        //Check if user exists
        try{
            let {data} = await axios.get(`${API_BASE}/users/${username}`)

            
            console.log('Validating Username . . .')
            //Checking if user exists
            if(data !== null){
                setUsernameError(`${username} exists`)
                setLoading(false)
                return
            }else{
                setUsernameError(null)
            }


            let emailData = await axios.get(`${API_BASE}/users/email/${email}`)

            console.log('Validating Email . . .')
            //Checking if email exists
            if(emailData.data !== null){
                setEmailError(`${email} exists`)
                setLoading(false)
                return
            }else{
                setEmailError(null)
            }

            console.log('Validating Password . . .')

            //Checking if the password passes the check criteria
            if(password.length < 8 || password.length > 16 ){
                setPasswordError('Password length should be between 8-16 characters')
                setLoading(false)
                return
            }else if(password.search(/[0-9]/) == -1){
                setPasswordError('Password should have atleast one number')
                setLoading(false)
                return
            }else if(password.search(/[a-zA-Z]/) == -1){
                setPasswordError('Password should have atleast one character')
                setLoading(false)
                return
            }else if(password.search(/[!\@\#\%\$\^\&\*\(\)\_\+\.\,\;\:]/) == -1){
                setPasswordError('Password should contain atleast one special character !')
                setLoading(false)
                return
            }else{
                setPasswordError(null)
            }

            //-----------------------------------
            //checking if both the passwords match
            if(password !== reEnterPassword ){
                setReEnterPasswordError(`Passwords don't match !`)
                setLoading(false)
                return
            }else{setReEnterPasswordError(null)}
            
            console.log('Passed validations . . .')
        }
        catch(err){
            console.log(`Error ${err}`)
            return
        }

        //-----------------------
        //Registration part
        try{
            console.log('Registering . . .')
            const {data} = await axios.post(`${API_BASE}/users`,{
                name,
                username,
                email,
                password
            })

            //Helping the user stay logged in
            if(data.username == username){
                signUp(username)
                console.log('Done 🤙')
            }

        }catch(err){
            console.log(`Error while registration ${err}`)
        }


    }

    //Component
    return (
        <View style={Containers.mainCenter}>
            <View style={Containers.bottomM}>
                <View style={Containers.flexHor}>
                    <LogoIcon height={40} width={32}/>
                    <Text style={OnboardingStyles.logoTxt}>Kharcha Pani</Text>
                </View>
            </View> 
            <Text style={SignInStyles.p}>Fill in the form to get your account.</Text>
            
            {/* Name */}
            <View style={Containers.topM}>
                <TextInput
                    placeholder='Name'
                    onChangeText={setName}
                    style={FormInputs.inputTxt}
                />
            </View>

            {/* Username */}
            <TextInput
                placeholder='Username'
                onChangeText={setUsername}
                style={FormInputs.inputTxt}
            />

            {
                usernameError
                ? <FormErrorMessage message={usernameError}/>
                : null
            }

            {/* Email */}
            <TextInput
                    placeholder='Email'
                    onChangeText={setEmail}
                    style={FormInputs.inputTxt}
                />

            {
                emailError
                ? <FormErrorMessage message={emailError}/>
                : null
            }
            
            {/* Password */}
            
            <TextInput 
                    placeholder='Password'
                    onChangeText={setPassword}
                    secureTextEntry={true}
                    style={FormInputs.inputTxt}
            />
            {
                passwordError
                ? <FormErrorMessage message={passwordError}/>
                : null
            }

            <TextInput 
                    placeholder='Re-Enter Password'
                    onChangeText={setReEnterPassword}
                    secureTextEntry={true}
                    style={FormInputs.inputTxt}
            />
            {
                reEnterPasswordError
                ? <FormErrorMessage message={reEnterPasswordError}/>
                : null
            }


            <View style={Containers.topXl}>
                <TouchableOpacity style={Buttons.btnPrm}
                    onPress={handleSubmit}>
                    <Text style={Buttons.btnPrmTxt}>
                        {
                            loading ? 'Loading . . .' : 'Sign Up'
                        }
                    </Text>
                </TouchableOpacity>
            </View>
            
        </View>
    )
}