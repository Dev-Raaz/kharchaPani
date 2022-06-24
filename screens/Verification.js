import {View, Text, ScrollView, TextInput, TouchableOpacity} from 'react-native'

//styles
import Containers from '../styles/containers'
import Typography from '../styles/typography'
import Buttons from '../styles/buttons'
import FormInputs from '../styles/forminputs'
import { useContext, useState } from 'react'
import { AuthContext } from '../components/context'
import axios from 'axios'
import API_BASE from '../config/api'

import {FormErrorMessage, FormSuccessMessage} from '../components/validations/Validations'

//Verification Component
const Verification = ({navigation}) => {
    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState(null)
    const [passwordErorr, setPasswordError] = useState(null)

    const {signOut, getUserName} = useContext(AuthContext)

    const handleSubmit = async() => {
        setLoading(true)
        const username = getUserName()
        const {data} = await axios.get(`${API_BASE}/users/${username}`)

        if(!password){
            alert('All fields are necessary')
        }

        if(password != data.password){
            setPasswordError('Incorrect password !')
            setLoading(false)
            return
        }else{
            setPasswordError(false)
        }

        try{
            const userData = await axios.delete(`${API_BASE}/users/${username}`)

            if(userData.data.username == username){
                setLoading(false)
                signOut()
            }

        }catch(err){
            console.log(`Error while deleting account ${err}`)
        }
    }


    return (
        <View style={Containers.mainFull}>
            <View style={Containers.topL}>
                <Text style={Typography.h3}>Note:-</Text>
            </View>
            <View style={Containers.topS}>
                <Text style={Typography.p}>Deleting your account will remove all your data from our databases . . .</Text>
            </View>

            <View style={Containers.topM}>
                <TextInput
                    placeholder='Enter Password To Delete Account'
                    style={FormInputs.inputTxt}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />
            </View>

            {
                passwordErorr
                ? <FormErrorMessage message={passwordErorr}/>
                : null
            }

            <View style={Containers.topXl}>
                <TouchableOpacity style={Buttons.btnPrm}
                    onPress={handleSubmit}>
                    <Text style={Buttons.btnPrmTxt}>
                        {loading ? 'Loading . . .' : 'Delete Account'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Verification