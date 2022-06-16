import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';

//Screens
import AppStack from './routes/AppStack';
import AuthStack from './routes/AuthStack';


//Creating a stack navigator
const Stack = createNativeStackNavigator()

export default function App() {

  const [isVerified, setIsVerified] = useState(true)

  return (
    <NavigationContainer>
          <Stack.Navigator
           screenOptions={
            {
              headerShown: false
            }
           }>
            {
              isVerified
              ? <Stack.Screen name='AppStack' component={AppStack}/>
              : <Stack.Screen name='AuthStack' component={AuthStack}/>
            }
          </Stack.Navigator>
    </NavigationContainer>
  );
}

