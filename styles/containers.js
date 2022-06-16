import {StyleSheet} from 'react-native'
import Variables from './variables'

export default Containers = StyleSheet.create({
    main: {
        padding: Variables.sizes.szM,
        backgroundColor: Variables.color.secColor
    },

    mainCenter: {
        padding: Variables.sizes.szM,
        backgroundColor: Variables.color.secColor,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    topXxl: {
        marginTop: Variables.sizes.szXxl
    },

    topXl: {
        marginTop: Variables.sizes.szXl
    },
    topL: {
        marginTop: Variables.sizes.szL
    },

    topM: {
        marginTop: Variables.sizes.szM
    },

    topS: {
        marginTop: Variables.sizes.szS
    },

    bottomXxl: {
        marginBottom: Variables.sizes.szXxl
    },

    bottomXl: {
        marginTop: Variables.sizes.szXl
    },
    bottomL: {
        marginBottom: Variables.sizes.szL
    },

    bottomM: {
        marginBottom: Variables.sizes.szM
    },

    bottomS: {
        marginBottom: Variables.sizes.szS
    },

    flexHor: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    flexHorNorm: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})