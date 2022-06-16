import {View, Text} from 'react-native'


import validationStyles from '../../styles/components/validations'

//Form Validations
export const FormErrorMessage = ({message}) => {
    return(
        <View style={validationStyles.error}>
            <Text style={validationStyles.errorTxt}>
                {message || 'Some Error Occured'}
            </Text>
        </View>
    )
}


export default FormErrorMessage