import {StyleSheet} from 'react-native'
import Variables from './variables'

export default Typography = StyleSheet.create({
    h1: {
        fontSize: Variables.sizes.szXxl
        
    },

    h2: {
        fontSize: Variables.sizes.szXl
    },

    h3: {
        fontSize: Variables.sizes.szL,
        fontWeight: 'bold'
    },

    h2Prm: {
        fontSize: Variables.sizes.szXl,
        color: Variables.color.prmColor
    },

    h3Prm: {
        fontSize: Variables.sizes.szL,
        color: Variables.color.prmColor
    },

    p: {
        fontSize: Variables.sizes.szM
    },

    pBold: {
        fontSize:Variables.sizes.szM,
        fontWeight: 'bold'
    },

    link: {
        fontSize: Variables.sizes.szM,
        color: Variables.color.prmColor
    },

    greenP: {
        fontSize: Variables.sizes.szM,
        color: Variables.color.success
    },

    redP: {
        fontSize: Variables.sizes.szM,
        color: Variables.color.error
    }
})