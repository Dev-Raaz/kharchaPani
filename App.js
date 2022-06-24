import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useReducer, useState }  from 'react';

//Screens
import AppStack from './routes/AppStack';
import AuthStack from './routes/AuthStack';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Contexts
import { AuthContext } from './components/context';


//Creating a stack navigator
const Stack = createNativeStackNavigator()

export default function App() {


  const initialLoginState = {
    userName: null
  }

  //Reducer function
  const loginReducer = (prevState, action) =>{
    
    //Action will have a type
    switch(action.type){
      case 'RETRIVE_LOGIN':
        return {
          ...prevState,
          userName: action.name
        }
      case 'SIGN_IN': 
        return {
          ...prevState,
          userName: action.name
        }
      case 'SIGN_UP':
        return {
          ...prevState,
          userName: action.name
        }
      case 'SIGN_OUT':
        return {
          ...prevState,
          userName: null
        }

    }
  }

  //Reducer Create
  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState)

  //Creating Context
  const authContext = React.useMemo(()=>({
    
    //---------------------------------
    //Sign In
    signIn: async(userName=null)=>{
      
      if(userName !== null){

        //-------------------------
        //Storing the username
        try{
          await AsyncStorage.setItem('userName', userName)
        }catch(err){
          console.log(`Storage error: ${err}`)
        }
        
        //Updating the state
        dispatch({type: 'SIGN_IN', name: userName })
      }
      
    },

    //---------------------------------
    //Sign Up
    signUp: async(userName=null)=> {
      
      if(userName !== null){

        //----------------------
        //Storing The Username
        try{
          await AsyncStorage.setItem('userName', userName)
        }catch(err){
          console.log(`Storage error: ${err}`)
        }

        //Updating the state
        dispatch({type: 'SIGN_UP', name: userName})
      }

    },

    signOut: async()=>{
      try{
        await AsyncStorage.removeItem('userName')
      }catch(err){
        console.log(`Error occured while removing login details ${err}`)
      }

      dispatch({type: 'SIGN_OUT', name: null})
    },

    getUserName: ()=>{
      return loginState.userName
    }
  }))


  //---------------------------------------------------------
  //Fetching User Stored Token
  useEffect(()=>{

    //To retrive Login Data
    (async() => {
      let userName = null

      try{
        userName = await AsyncStorage.getItem('userName')
      }catch(err){
        console.log(`Error while retriving login info ${err}`)
      }

      dispatch({type: 'RETRIVE_LOGIN',name: userName })
    })()

  },[])


  return (
    <AuthContext.Provider value={authContext}>
        <NavigationContainer>
            <Stack.Navigator
            screenOptions={
              {
                headerShown: false
              }
            }>
              {
                loginState.userName
                ? <Stack.Screen name='AppStack' component={AppStack}/>
                : <Stack.Screen name='AuthStack' component={AuthStack}/>
              }
            </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

