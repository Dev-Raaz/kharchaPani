import {View, Text, ScrollView, TouchableOpacity} from 'react-native'
import LogoIcon from '../assets/branding/logo'

//styles
import Containers from '../styles/containers'
import Typography from '../styles/typography'
import Buttons from '../styles/buttons'
import OnboardingStyles from '../styles/screens/onboarding'

export default Onboarding = ({navigation}) => {

    return (
        <View style={Containers.mainCenter}>
            <View style={Containers.bottomM}>
                <View style={Containers.flexHor}>
                    <LogoIcon height={40} width={32}/>
                    <Text style={OnboardingStyles.logoTxt}>Kharcha Pani</Text>
                </View>
            </View>        

            <View style={Containers.topM}>
                <TouchableOpacity style={OnboardingStyles.btnPrm}
                    onPress={()=>navigation.navigate('SignIn')}>
                    <Text style={Buttons.btnPrmTxt}>Sign In</Text>
                </TouchableOpacity>
            </View>

            <View style={Containers.topM}>
                <TouchableOpacity style={OnboardingStyles.btnSec}
                    onPress={()=>navigation.navigate('SignUp')}>
                    <Text style={Buttons.btnSecTxt}>Sign Up</Text>
                </TouchableOpacity>
            </View>
            

        </View>
    )
}