import {View, Text, ScrollView} from 'react-native'

//styles
import Containers from '../styles/containers'
import Typography from '../styles/typography'
import Buttons from '../styles/buttons'

const ChangePassword = ({navigation}) => {

    return (
        <View style={Containers.main}>
            <View style={Containers.topXxl}>
                <Text style={Typography.h1}>Change Password Screen</Text>
            </View>
        </View>
    )
}

export default ChangePassword