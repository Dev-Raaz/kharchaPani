import { StyleSheet } from "react-native";
import Variables from "./variables";

const FormInputs = StyleSheet.create({
    inputTxt: {
        padding: Variables.sizes.szS,
        fontSize: Variables.sizes.szM,
        borderRadius: Variables.radius.m,
        borderColor: Variables.borderColors.light,
        borderWidth: 1,
        width: '100%' ,
        marginTop: Variables.sizes.szM
    },
    
    txtArea: {
        padding: Variables.sizes.szS,
        fontSize: Variables.sizes.szM,
        borderRadius: Variables.radius.m,
        borderColor: Variables.borderColors.light,
        borderWidth: 1,
        width: '100%' ,
        marginTop: Variables.sizes.szM,
        height: 240,
        alignContent: 'flex-start'
    },

    forgotPwd: {
        fontSize: Variables.sizes.szM,
        marginTop: Variables.sizes.szM,
        color: Variables.color.prmColor
    },
    forgotPwdTxt: {
        color: Variables.color.prmColor,
        textAlign: 'center'
    }
})

export default FormInputs