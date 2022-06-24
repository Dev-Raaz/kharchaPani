import { StyleSheet } from "react-native"
import Variables from "../variables"

const Navbar = StyleSheet.create({
    nav: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 56,
        paddingLeft: Variables.sizes.szM,
        paddingRight: Variables.sizes.szM,
        backgroundColor: Variables.color.secColor,
        elevation: 4,
        zIndex: 5
    },

    logo: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    logoTxt: {
        fontSize: Variables.sizes.szM,
        color: Variables.color.prmColor,
        marginLeft: 6
    }
})

export default Navbar