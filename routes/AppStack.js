import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens
import Home from '../screens/Home';
import ChangePassword from '../screens/ChangePassword';
import OTPVerification from '../screens/OTPVerification';

//Creating Staack Navigator
const Stack = createNativeStackNavigator()

const AppStack = () => {
    return (
        <Stack.Navigator initialRouteName='Home'>
            
            <Stack.Screen 
            name='Home' 
            component={Home}
            options={{
                headerBackVisible: false,
                title: 'Kharcha Pani'
            }}/>
            
            <Stack.Screen
                name='ChangePassword'
                component={ChangePassword}
                options={{
                    title: "Change Password"
                }}
            />
            
            <Stack.Screen
                name='OTPVerification'
                component={OTPVerification}
                options={{
                    title: "OTP Verification"
                }}
            />

            
        </Stack.Navigator>
    )
}

export default AppStack