import {View, Text} from 'react-native'

import FormValidations from '../../styles/validations'

//Form Validations
export const FormErrorMessage = ({message}) => {
    return(
        <View style={FormValidations.valErr}>
            <Text style={FormValidations.valErrTxt}>
                {message || 'Some Error Occured'}
            </Text>
        </View>
    )
}

//Form Validations
export const FormSuccessMessage = ({message}) => {
    return(
        <View style={FormValidations.valSucc}>
            <Text style={FormValidations.valSuccTxt}>
                {message || 'Done'}
            </Text>
        </View>
    )
}


export default FormErrorMessage