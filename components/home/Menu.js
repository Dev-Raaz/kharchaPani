import {View, TextInput, Text, StyleSheet, Button, TouchableOpacity} from 'react-native'
import CloseIcon from '../../assets/buttons/close'

import Variables from '../../styles/variables'
import Typography from '../../styles/typography'
import FormInputs from '../../styles/forminputs'
import Buttons from '../../styles/buttons'
import DropdownComponent from './Dropdown'
import { useContext, useEffect, useState } from 'react'

import { FormSuccessMessage } from '../validations/Validations'

//Getting context
import { AuthContext } from '../context'
import axios from 'axios'
import API_BASE from '../../config/api'

const Menu = ({setShowMenu, nameOfUser, navigation}) => {


    const [success, setSuccess] = useState(null)


    return (
        <View style={styles.formContainer}>
            
            <View style={styles.header}>
                <Text style={{fontSize: 20}}>
                    {`Hello ${nameOfUser}`} 
                </Text>

                <TouchableOpacity onPress={()=>setShowMenu(false)}>
                    <CloseIcon/>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={()=>navigation.navigate('AddCategory')}>
                <Text>Add Category</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>navigation.navigate('RemoveCategory')}>
                <Text>Remove Categories</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>navigation.navigate('ChangePassword')}>
                <Text>Change Password</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>navigation.navigate('Verification')}>
                <Text>Delete Account</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        backgroundColor: Variables.color.secColor,
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        zIndex: 10,
        padding: Variables.sizes.szM
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 64,
        justifyContent: 'space-between'
    },

    incomeTxt: {
        color: Variables.color.success,
        marginBottom: 10,
        fontWeight: 'bold'
    },

    expenseTxt: {
        color: Variables.color.error,
        marginBottom: 10,
        fontWeight: 'bold'
    },

    date: {
        color: '#707070'
    },

    description: {
        marginTop: 14        
    }
    

})

export default Menu