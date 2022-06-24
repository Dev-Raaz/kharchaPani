import {StyleSheet} from 'react-native'
import Variables from './variables'

export default Buttons = StyleSheet.create({
    
    btnPrm: {
        padding: Variables.sizes.szXl,
        paddingTop: Variables.sizes.szS,
        paddingBottom: Variables.sizes.szS,
        borderRadius: 100,
        backgroundColor: Variables.color.prmColor,
        width: '100%'
    },

    btnPrmTxt: {
        color: Variables.color.secColor,
        fontSize: Variables.sizes.szM,
        textAlign: 'center'
    },

    btnSec: {
        padding: Variables.sizes.szL,
        paddingTop: Variables.sizes.szS,
        paddingBottom: Variables.sizes.szS,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: Variables.color.prmColor
    },

    btnSecTxt: {
        color: Variables.color.prmColor,
        fontSize: Variables.sizes.szM,
        textAlign: 'center'
    }
    
})