import {StyleSheet} from 'react-native'
import Variables from '../variables'

export default Onboarding = StyleSheet.create({
    logoTxt: {
        fontSize: 18,
        color: Variables.color.prmColor,
        marginLeft: 6
    },

    btnPrm: {
        padding: 80,
        paddingTop: Variables.sizes.szS,
        paddingBottom: Variables.sizes.szS,
        borderRadius: 100,
        backgroundColor: Variables.color.prmColor
    },

    btnSec: {
        padding: 80,
        paddingTop: Variables.sizes.szS,
        paddingBottom: Variables.sizes.szS,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: Variables.color.prmColor
    }
})