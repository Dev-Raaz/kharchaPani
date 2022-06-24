import {Text, View, TextInput, TouchableOpacity} from 'react-native'

//styles
import Containers from '../styles/containers'
import Typography from '../styles/typography'
import Buttons from '../styles/buttons'
import FormInputs from '../styles/forminputs'
import DropdownComponent from '../components/home/Dropdown'
import { FormSuccessMessage } from '../components/validations/Validations'

import { AuthContext } from '../components/context'
import API_BASE from '../config/api'

import { useContext, useState } from 'react'
import axios from 'axios'

const AddCategory = ()=> {
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState(null)
    const [type, setType] = useState('income')
    const [success, setSuccess] = useState(null)

    const types = [
        { label: 'Expense', value: 'expense' },
        { label: 'Income', value: 'income' }
      ]

    const {getUserName} = useContext(AuthContext)


    //Function to add category
    const handlePress = async() => {
        setLoading(true)

        if(!name){
            alert(`All fields are required`)
            setLoading(false)
        }

        //username
        const username = getUserName()

        try{

            //Adding Category
            const {data} = await axios.post(`${API_BASE}/categories`,{
                name: name,
                type: type,
                username: username
            })

            if(data.username == username){
                setLoading(false)
                setSuccess(`Added category ${name}`)
            }
        }catch(err){
            console.log(`Error: ${err}`)
        }
        
    }


    return (
        <View style={Containers.mainFull}>
            <Text style={Typography.h3}>Fill in the form</Text>
            <TextInput
            placeholder='Category Title'
            style={FormInputs.inputTxt}
            onChangeText={setName}
            />
            <DropdownComponent data={types} value={type} setValue={setType} label={'Type'} search={false}/>

            {
                success
                ? <FormSuccessMessage message={success}/>
                : null
            }

            <View style={Containers.topXl}>
                <TouchableOpacity style={Buttons.btnPrm} 
                onPress={handlePress}>
                    <Text style={Buttons.btnPrmTxt}>
                        {
                            loading ? 'Loading . . .' : 'Add Transaction'
                        }
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AddCategory