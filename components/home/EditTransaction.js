import { View, StyleSheet, Text, TouchableOpacity, TextInput } from "react-native"


import Variables from '../../styles/variables'
import Typography from '../../styles/typography'
import FormInputs from '../../styles/forminputs'
import Buttons from '../../styles/buttons'
import DropdownComponent from './Dropdown'
import { FormSuccessMessage } from "../validations/Validations"

import CloseIcon from "../../assets/buttons/close"
import { useEffect, useState, useContext } from "react"
import { AuthContext } from "../context"
import axios from "axios"
import API_BASE from "../../config/api"

const EditTransaction = ({setOpenEdit, viewTransaction, addedTransaction, setAddedTransaction}) => {


    const [title, setTitle] = useState(null)
    const [amount, setAmount] = useState(0)
    const [description, setDescription] = useState(null)
    const [loading, setLoading] = useState(false)

    const [success, setSuccess] = useState(null)

    //const {getUserName} = useContext(AuthContext)


    useEffect(()=>{

        console.log(viewTransaction.amount)
        //Setting Amounts
        setTitle(viewTransaction.title)
        setAmount(viewTransaction.amount)
        setDescription(viewTransaction.description)

    }, [])

    //Update transaction
    const updateTransaction = async() => {
        setLoading(true)
        console.log(Number(amount))
        console.log(title)
        console.log(description)
        try{
            const {data} = await axios.patch(`${API_BASE}/transactions/${viewTransaction._id}`,{
                title: title,
                amount: Number(amount),
                description: description
            })

            //Hello There
            console.log(`Logging The Data . . .`)
            setLoading(false)
            setAddedTransaction(!addedTransaction)
            setSuccess(`Successfully Updated Transaction ${data.title}`)
        }catch(err){
            console.log(`Error during updating transaction: ${err}`)
            setSuccess(null)
        }
    }


    return (
        <View style={styles.formContainer}>
            <View style={styles.header}>
                <Text style={{fontSize: 20}}>
                    {'Edit '}
                    <Text style={{fontSize: 20, color: Variables.color.prmColor}}>Transaction</Text> 
                </Text>

                <TouchableOpacity onPress={()=>setOpenEdit(false)}>
                    <CloseIcon/>
                </TouchableOpacity>
            </View>

            
            <TextInput 
                style={FormInputs.inputTxt}
                placeholder='Title'
                value={title}
                onChangeText={setTitle}
                />
                
                <TextInput 
                style={FormInputs.inputTxt}
                placeholder='Amount'
                keyboardType="numeric"
                value={amount.toString()}
                onChangeText={setAmount}
                />
                
                <TextInput 
                style={FormInputs.inputTxt}
                placeholder='Description'
                value={description}
                onChangeText={setDescription}
                />

            {
                success
                ? <FormSuccessMessage message={success}/>
                : null
            }

            <View style={{width: '100%', marginTop: Variables.sizes.szXxl}}>
                <TouchableOpacity style={Buttons.btnPrm} onPress={updateTransaction}>
                    <Text style={Buttons.btnPrmTxt}>
                        {
                            loading ? 'Loading . . .' : 'Update Transaction'
                        }
                    </Text>
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
    },

    incomeTxt: {
        color: Variables.color.success,
        marginBottom: 10,
        fontWeight: 'bold'
    },

    expenseTxt: {
        color: Variables.color.error,
        marginBottom: 10,
        fontWeight: 'bold'
    },

    date: {
        color: '#707070'
    },

    description: {
        marginTop: 14        
    }
    

})

export default EditTransaction