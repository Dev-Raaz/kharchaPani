import {StyleSheet} from 'react-native'
import Variables from '../variables'
import { Dimensions } from 'react-native'

export default SignIn = StyleSheet.create({
    p: {
        fontSize: Variables.sizes.szM,
        maxWidth: Dimensions.get('window').width - 80,
        textAlign: 'center'

    }
})