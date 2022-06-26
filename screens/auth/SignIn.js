import {View, Text, ScrollView, TouchableOpacity, TextInput} from 'react-native'
import { useContext, useState } from 'react'

import LogoIcon from '../../assets/branding/logo'
import FormErrorMessage from '../../components/validations/Validations'
import { AuthContext } from '../../components/context'
import axios from 'axios'
import API_BASE from '../../config/api'

//styles
import Containers from '../../styles/containers'
import Typography from '../../styles/typography'
import Buttons from '../../styles/buttons'
import OnboardingStyles from '../../styles/screens/onboarding'
import SignInStyles from '../../styles/screens/signin'
import FormInputs from '../../styles/forminputs'


export default SignIn = ({navigation}) => {

    //Values For Inputs
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const [usernameError, setUsernameError] = useState(null)
    const [passwordError, setPasswordError] = useState(null)

    const {signIn} = useContext(AuthContext)

    const handleSubmit = async() => {

        //Loading . . .
        setLoading(true)
        console.log(`Got into handler`)

        if(!username || !password){
            alert('All fields are required')
            setLoading(false)
            return
        }

        //Checking if the user exists
        try{
            console.log('Making Request . . .')
            //Requesting the user
            const {data} = await axios.get(`${API_BASE}/users/${username}`)
            
            //If this part is passed
            
            if(data == null){
                console.log(`Username Error occuring . . .`)
                setUsernameError(`No user with ${username} username`)
                setLoading(false)
                return
            }else{
                setUsernameError(null)
            }

            //Checking for password
            //if(data.password == password)
            if(password == data.password){
                //Signing in the user  . . .
                
                console.log('Making Request . . .')
                signIn(username)
                setPasswordError(null)
                setLoading(false)
            }else{
                console.log(`Password Error occuring . . .`)
                setPasswordError('Incorrect Password !!')
                return
            }

        }catch(err){
            console.log(err)
        }
    }

    return (
        <View style={Containers.mainCenter}>
            <View style={Containers.bottomM}>
                <View style={Containers.flexHor}>
                    <LogoIcon height={40} width={32}/>
                    <Text style={OnboardingStyles.logoTxt}>Kharcha Pani</Text>
                </View>
            </View> 
            <Text style={SignInStyles.p}>Enter proper credentials to access your Kharcha Pani account</Text>

            {/* Username */}
            <View style={Containers.topM}>
                <TextInput
                    placeholder='Username'
                    onChangeText={setUsername}
                    style={FormInputs.inputTxt}
                />
            </View>

            {
                usernameError 
                ? <FormErrorMessage message={usernameError}/>
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

            <TouchableOpacity style={FormInputs.forgotPwd} onPress={()=>navigation.navigate('OTPVerification')}>
                <Text style={FormInputs.forgotPwdTxt}>Forgot Password ?</Text>
            </TouchableOpacity>

            <View style={Containers.topXl}>
                <TouchableOpacity style={Buttons.btnPrm}
                    onPress={handleSubmit}>
                    <Text style={Buttons.btnPrmTxt}>
                        {
                            loading ? 'Loading . . .' : 'Sign In'
                        }
                    </Text>
                </TouchableOpacity>
            </View>
            
        </View>
    )
}