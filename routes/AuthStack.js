import { createNativeStackNavigator } from '@react-navigation/native-stack';


//Screens
import Onboarding from '../screens/Onboarding'
import SignIn from '../screens/auth/SignIn';
import SignUp from '../screens/auth/SignUp';
import OTPVerification from '../screens/forgot/OTPVerification';
import GetNewPassword from '../screens/forgot/GetNewPassword';


const Stack = createNativeStackNavigator()

const AuthStack = ({}) => {
    return (
        <Stack.Navigator 
            screenOptions={{}}
            initialRouteName='Onboarding'>
            <Stack.Screen 
                name='Onboarding' 
                component={Onboarding}
                options={{
                    headerShown: false
                }}/>
            <Stack.Screen
                name='SignIn'
                component={SignIn}
                options={
                    {
                        title: ''
                    }
                } 
            />
            
            <Stack.Screen
                name='SignUp'
                component={SignUp}
                options={
                    {
                        title: ''
                    }
                } 
            />

            <Stack.Screen
                name='OTPVerification'
                component={OTPVerification}
                options={
                    {
                        title: 'Verify Yourself'
                    }
                } 
            />

            <Stack.Screen
                name='GetNewPassword'
                component={GetNewPassword}
                options={
                    {
                        headerShown: false
                    }
                }
            />
        </Stack.Navigator>
    )
}

export default AuthStack