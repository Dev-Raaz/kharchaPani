import {View, Text, ScrollView} from 'react-native'

//styles
import Containers from '../styles/containers'
import Typography from '../styles/typography'
import Buttons from '../styles/buttons'

const OTPVerification = ({navigation}) => {

    return (
        <View style={Containers.main}>
            <View style={Containers.topXxl}>
                <Text style={Typography.h1}>OTP Verification Screen</Text>
            </View>
        </View>
    )
}

export default OTPVerification