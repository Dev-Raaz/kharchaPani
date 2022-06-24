import {StyleSheet} from 'react-native'
import Variables from './variables'

const FormValidations = StyleSheet.create({
    valErr: {
        padding: Variables.sizes.szS,
        borderStyle: 'dashed',
        borderColor: Variables.color.error,
        borderWidth: 1,
        width: '100%' ,
        marginTop: Variables.sizes.szM,
        borderRadius: Variables.radius.m
    },

    valErrTxt: {
        color: Variables.color.error,
        fontSize: Variables.sizes.szM
    },

    valSucc: {
        padding: Variables.sizes.szS,
        borderStyle: 'dashed',
        borderColor: Variables.color.success,
        borderWidth: 1,
        width: '100%' ,
        marginTop: Variables.sizes.szM,
        borderRadius: Variables.radius.m
    },

    valSuccTxt: {
        color: Variables.color.success,
        fontSize: Variables.sizes.szM
    }
}) 

export default FormValidations