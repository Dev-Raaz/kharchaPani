import {View, Text, ScrollView} from 'react-native'

//styles
import Containers from '../styles/containers'
import Typography from '../styles/typography'
import Buttons from '../styles/buttons'

export default Onboarding = ({navigation}) => {

    return (
        <View style={Containers.main}>
            <View style={Containers.topXxl}>
                <Text style={Typography.h1}>Onboarding Screen</Text>
            </View>
        </View>
    )
}