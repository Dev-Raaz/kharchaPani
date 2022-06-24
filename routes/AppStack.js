import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens
import Home from '../screens/Home';
import ChangePassword from '../screens/ChangePassword';
import Verification from '../screens/Verification';
import AddCategory from '../screens/AddCategory';
import RemoveCategory from '../screens/RemoveCategory';

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
                headerShown: false,
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
                name='Verification'
                component={Verification}
                options={{
                    title: "Verification"
                }}
            />
            
            <Stack.Screen
                name='AddCategory'
                component={AddCategory}
                options={{
                    title: "Add Category"
                }}
            />
            
            <Stack.Screen
                name='RemoveCategory'
                component={RemoveCategory}
                options={{
                    title: "Remove Category"
                }}
            />

            
        </Stack.Navigator>
    )
}

export default AppStack