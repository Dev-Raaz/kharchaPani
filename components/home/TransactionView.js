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

const TransactionView = ({hideTransactionView, addedTransaction, setAddedTransaction, setOpenEdit, viewTransaction = null}) => {

    const [success, setSuccess] = useState(null)

    const deleteTransaction = async() =>{
        try{
            const {data} = await axios.delete(`${API_BASE}/transactions/${viewTransaction._id}`)
            
            if(data != []){
                setSuccess(`Deleted transaction`)
                setAddedTransaction(!addedTransaction)
            }
                
        }catch(err){
            console.log(`Failed to delete: ${err}`)
            console.log(`${API_BASE}/transactions/${viewTransaction._id}`)
        }
    }

    return (
        <View style={styles.formContainer}>
            
            <View style={styles.header}>
                <Text style={{fontSize: 20}}>
                    {viewTransaction.title || 'Transaction Title'} 
                </Text>

                <TouchableOpacity onPress={()=>hideTransactionView(true)}>
                    <CloseIcon/>
                </TouchableOpacity>
            </View>

            <Text style={viewTransaction.type == 'income'?styles.incomeTxt:styles.expenseTxt}>
                {viewTransaction.type == 'income'?'+':'-'}₹{viewTransaction.amount || 0 }
            </Text>

            <Text style={styles.date}>
                {`${new Date(viewTransaction.updatedAt).getDate()}-${new Date(viewTransaction.updatedAt).getMonth()}-${new Date(viewTransaction.updatedAt).getYear()}`}
            </Text>

            <Text style={styles.description}>
                {viewTransaction.description || 'Some Description'}
            </Text>

            <View style={{width: '100%', marginTop: Variables.sizes.szXxl, position: 'absolute', bottom: 24, right: 14}}>
                {
                    success ?
                    <FormSuccessMessage message={success}/>
                    : null
                }
                <View style={{marginTop: Variables.sizes.szM}}>
                    <TouchableOpacity style={Buttons.btnSec} onPress={()=>{
                        setOpenEdit(true)
                        hideTransactionView(true)
                        }}>
                        <Text style={Buttons.btnSecTxt}>Edit Transaction</Text>
                    </TouchableOpacity>
                </View>
                <View style={{marginTop: Variables.sizes.szM}}>
                    <TouchableOpacity style={Buttons.btnPrm} onPress={deleteTransaction}>
                        <Text style={Buttons.btnPrmTxt}>Delete Transaction</Text>
                    </TouchableOpacity>
                </View>

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

export default TransactionView