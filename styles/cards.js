import { StyleSheet } from 'react-native'
import Variables from './variables'

const styles = StyleSheet.create({
    horCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: Variables.radius.m,
        elevation: 2,
        backgroundColor: Variables.color.secColor,
        padding: Variables.sizes.szM
    },

    verCard: {
        flexDirection: 'column',
        borderRadius: Variables.radius.m,
        elevation: 2,
        backgroundColor: Variables.color.secColor,
        padding: Variables.sizes.szM
    },

    horCardWrapper: {
        flex: 1.5
    },

    incomeCard: {
        borderRadius: Variables.radius.m,
        elevation: 2,
        backgroundColor: Variables.color.secColor,
        padding: Variables.sizes.szM
    },

    incomeCardTxt: {
        color: Variables.color.success
    },

    incomeCardTxtBold: {
        color: Variables.color.success,
        fontWeight: 'bold'
    },

    expenseCardTxt: {
        color: Variables.color.error
    },

    expenseCardTxtBold: {
        color: Variables.color.error,
        fontWeight: 'bold'
    },

    incomeCardFlex: {
        borderRadius: Variables.radius.m,
        elevation: 2,
        backgroundColor: Variables.color.secColor,
        padding: Variables.sizes.szM,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    incomeCardFlexLabels: {
        marginLeft: Variables.sizes.szS
    },

    incomePieLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Variables.sizes.szS,
        marginTop: Variables.sizes.szS
    },

    incomePieTitle: {
        fontSize: 12,
        marginBottom: 4,
        marginLeft: 10
    },

    incomePieAmount: {
        fontSize: 8,
        marginBottom: 4,
        marginLeft: 10,
        fontWeight: 'bold'
    }


})

export default styles