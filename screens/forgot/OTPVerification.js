import {View, Text, TouchableOpacity, TextInput} from 'react-native'


import {FormErrorMessage, FormSuccessMessage} from '../../components/validations/Validations'

//styles
import Containers from '../../styles/containers'
import Typography from '../../styles/typography'
import Buttons from '../../styles/buttons'
import OnboardingStyles from '../../styles/screens/onboarding'
import SignInStyles from '../../styles/screens/signin'
import FormInputs from '../../styles/forminputs'
import { useContext, useState } from 'react'
import { AuthContext } from '../../components/context'
import axios from 'axios'
import API_BASE from '../../config/api'


const OTPVerification = ({navigation}) => {

    const [email, setEmail] = useState(null)
    const [loading, setLoading] = useState(null)
    const [emailVerified, setEmailVerified] = useState(false)
    const [verificationError, setVerificationError] = useState(null)
    const [reSending, setReSending] = useState(null)
    const [OTP, setOTP] = useState(null)
    const [otpNumber, setOtpNumber] = useState(null)

    const [emailError, setEmailError] = useState(null)
    
    //Intializing Mailer

    //Hello There
    const VerifyEmail = async() => {
        setLoading(true)

        
        if(!email){
            alert('All Fields are required !!')
            return
        }
        
        try{
            const {data} = await axios.get(`${API_BASE}/users/email/${email}`)

            if(data == null){
                setEmailError('Email is not associated with any account !')
                setLoading(false)
            }else{
                setEmailVerified(true)
            }
        }catch(err){
            console.log(`Error: ${err}`)
        }

        //Send the first OTP
        sendOTP(email)
        
    }


    //Sending OTP
    const sendOTP = async(to)=>{

        const generateOTP = (length) => {
            const digits = '0123456789';
            let OTP = '';
            for (let i = 0; i < length; i++) {
              OTP += digits[Math.floor(Math.random() * 10)];
            }
            return OTP;
          };

        //Generating the OTP
        const otp = generateOTP(6)
        
        //-----------------------------
        //Setting the OTP
        setOTP(otp)

        try{
            
            const {data} = await axios.post(`${API_BASE}/users/email/${to}/verify`,{otp: otp})

            if(data == to){
                //Stopping loading and allowing to enter otp
                setLoading(false)
                setEmailError(null)
                console.log(data)
            }

        }catch(err){
            console.log(`Error while sending OTP: ${err}`)
        }
    }

    //Verify OTP
    const VerifyOTP = ()=>{
        setLoading(true)
        if(!otpNumber){
            alert('All Fields are required !!')
            setLoading(false)
            return
        }

        if(OTP == otpNumber){
            navigation.navigate('GetNewPassword',{
                email: email
            })
            setLoading(false)
            setVerificationError(null)
        }else{
            setVerificationError('Please Enter the correct OTP')
            setLoading(false)
        }
    }

    //To Resend OTP
    const ReSendOTP = async() => {
        setReSending(true)
        await sendOTP(email)
        setReSending(false)
    }


    return (
        <View style={Containers.mainFull}>
            {
                emailVerified
                ? null
                : <View style={Containers.topL}>
                    <Text style={Typography.h3}>Get OTP</Text>
                   </View> 
            }

            {/* Email */}
            {
                emailVerified
                ? null
                : <TextInput
                    placeholder='Your Email . . .'
                    onChangeText={setEmail}
                    style={FormInputs.inputTxt}
                />
            }
            {
                emailError
                ? <FormErrorMessage message={emailError}/>
                : null
            }

            

            {/* OTP Verification */}
            {
                emailVerified
                ? 
                    <View style={Containers.topL}>
                        <Text style={Typography.h3}>Verify OTP</Text>
                        <View style={Containers.topM}>
                        <Text style={Typography.p}>
                            Enter the OTP sent to your mail.
                        </Text>
                    </View>
                    </View>
                : null
            }
            {
                emailVerified
                ? 
                <TextInput
                    placeholder='Enter OTP '
                    onChangeText={setOtpNumber}
                    keyboardType={'numeric'}
                    style={FormInputs.inputTxt}
                />
                : null
            }
            {
                verificationError
                ? <FormErrorMessage message={verificationError}/>
                : null
            }


            <View style={Containers.topXl}>
                {
                    emailVerified
                    ? null
                    : <TouchableOpacity style={Buttons.btnPrm} onPress={VerifyEmail}>
                        <Text style={Buttons.btnPrmTxt}>
                        {
                            loading ? 'Loading . . .' : 'Get OTP'                    
                        }
                        </Text>
                    </TouchableOpacity>
                }

                {/* To Verify OTP */}
                {
                    emailVerified
                    ? <View>
                        <TouchableOpacity style={Buttons.btnPrm} onPress={VerifyOTP}>
                            <Text style={Buttons.btnPrmTxt}>
                            {
                                loading ? 'Loading . . .' : 'Verify OTP'                    
                            }
                            </Text>
                        </TouchableOpacity>
                        
                        {/* Resend OTP */}
                        <View style={Containers.topL}>
                            <TouchableOpacity style={Buttons.btnSec} onPress={ReSendOTP}>
                            <Text style={Buttons.btnSecTxt}>
                            {
                                reSending ? 'Resending . . .' : 'Resend OTP'                    
                            }
                            </Text>
                        </TouchableOpacity>
                        </View>    

                      </View>
                    : null
                }
            </View>
        </View>
    )
}


export default OTPVerification