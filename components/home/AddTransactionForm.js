import {View, TextInput, Text, StyleSheet, Button, TouchableOpacity} from 'react-native'
import CloseIcon from '../../assets/buttons/close'

import Variables from '../../styles/variables'
import Typography from '../../styles/typography'
import FormInputs from '../../styles/forminputs'
import Buttons from '../../styles/buttons'
import DropdownComponent from './Dropdown'
import { useContext, useEffect, useState } from 'react'

import { FormSuccessMessage } from '../validations/Validations'

//Getting context
import { AuthContext } from '../context'
import axios from 'axios'
import API_BASE from '../../config/api'

const AddTransactionForm = ({hideForm, addedTransaction, setAddedTransaction}) => {

    const [type, setType] = useState('income')
    const [category, setCategory] = useState(null)
    const [categories, setCategories] = useState([])
    const [title, setTitle] = useState(null)
    const [amount, setAmount] = useState(null)
    const [description, setDescription] = useState(null)

    const [success, setSuccess] = useState(null)

    //Types
    const types = [
        { label: 'Expense', value: 'expense' },
        { label: 'Income', value: 'income' }
      ]

    const {getUserName} = useContext(AuthContext)
    
    //Create Transaction
    const createTransaction = async () => {
        console.log('Got Into transaction')
        const username = getUserName()
        
        //Let's create a transaction
        try{
            console.log(username, category, title, amount, description)
            const {data} = await axios.post(`${API_BASE}/transactions`,{
                user: username,
                category,
                title,
                amount,
                description
            })

            setAddedTransaction(!addedTransaction)
            setSuccess(`Success fully created transaction ${data.title}`)

        }catch(err){
            console.log(`Error while creating transaction`)
        }

    }

    //Getting user name
    useEffect(()=>{
        //Get all the user categories
        let uName = getUserName() 
        const getCategories = async() =>{
            try{
                if(uName !== null){
                    const {data} = await axios.get(`${API_BASE}/categories/user/${uName}`) 
                    
                    //Separating income and expense categories
                    let eCats = []
                    let iCats = []

                    data.map(datum => {
                        if(datum.type === 'expense'){
                            eCats.push({
                                label: datum.name,
                                value: datum._id
                            })
                        }else{
                            if(datum.type === 'income'){
                                iCats.push({
                                    label: datum.name,
                                    value: datum._id
                                })
                            }
                        }
                    })

                    //Setting the categories
                    //console.log(uCats)
                    if(type == 'expense'){
                        setCategories(eCats)
                    }else{
                        setCategories(iCats)
                    }
                    
                }
            }catch(err){
                console.log(`Error: ${err}`)
            }
        }
        getCategories()

    }, [categories, type])


    return (
        <View style={styles.formContainer}>
            <View style={styles.header}>
                <Text style={{fontSize: 20}}>Add 
                    <Text style={{color: Variables.color.prmColor}}> Transaction</Text>
                </Text>

                <TouchableOpacity onPress={hideForm}>
                    <CloseIcon/>
                </TouchableOpacity>
            </View>

            <TextInput 
            style={FormInputs.inputTxt}
            placeholder='Title'
            onChangeText={setTitle}
            />

            <DropdownComponent data={types} value={type} setValue={setType} label={'Type'}/>

            <DropdownComponent data={categories} value={category} setValue={setCategory} label={'Category'}/>

            <TextInput 
                style={FormInputs.inputTxt}
                placeholder='Amount'
                keyboardType='number-pad'
                onChangeText={setAmount}
            />

            <TextInput 
                style={FormInputs.inputTxt}
                placeholder='Description'
                multiline={true}
                onChangeText={setDescription}
            />
            
            {/* SUCCESS MESSAGE */}
            {
                success
                ? <FormSuccessMessage message={success}/>
                : null
            }

            <View style={{width: '100%', marginTop: Variables.sizes.szXxl}}>
                <TouchableOpacity style={Buttons.btnPrm} onPress={createTransaction}>
                    <Text style={Buttons.btnPrmTxt}>Create Transaction</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        backgroundColor: Variables.color.secColor,
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        zIndex: 10,
        padding: Variables.sizes.szM
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 64,
        justifyContent: 'space-between'
    }

})

export default AddTransactionForm