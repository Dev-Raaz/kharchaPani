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
    }
})

export default styles